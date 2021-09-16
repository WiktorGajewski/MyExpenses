﻿using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using MyExpenses.API.Extensions;
using MyExpenses.API.Filters;
using MyExpenses.API.Helpers;
using MyExpenses.API.Resources;
using MyExpenses.API.Wrappers;
using MyExpenses.Core.Entities;
using MyExpenses.Data.Interfaces;
using System.Collections.Generic;

namespace MyExpenses.API.Controllers
{
    [ApiController]
    [Route("api/expenses")]
    public class ExpensesController : ControllerBase
    {
        private readonly IExpenseRepository _expenseRepository;
        private readonly IMapper _mapper;

        public ExpensesController(IExpenseRepository expenseRepository, IMapper mapper)
        {
            _expenseRepository = expenseRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [Produces("application/json","application/xml")]
        [ProducesResponseType(typeof(PagedResponse<IEnumerable<ExpenseGetDto>>), 200)]
        [ProducesResponseType(typeof(ProblemDetails), 400)]
        public ActionResult<PagedResponse<IEnumerable<ExpenseGetDto>>> GetExpenses([FromQuery] PaginationFilter filterPage,
            [FromQuery] ExpenseFilter filter)
        {
            var expenses = _expenseRepository.GetExpensesAndFilter(filterPage.PageNumber, filterPage.PageSize,
                    filter.SearchTerm, filter.ExpenseCategory);

            return Ok(
                PaginationHelper.CreatePagedResponse(expenses, filterPage, _expenseRepository.CountExpenses(filter.SearchTerm, filter.ExpenseCategory))
            );
        }

        [HttpHead]
        [Produces("application/json", "application/xml")]
        [ProducesResponseType(typeof(EmptyResult), 200)]
        public ActionResult<IEnumerable<ExpenseGetDto>> HeadExpenses()
        {
            var expenses = _expenseRepository.GetAllExpenses();

            return Ok(_mapper.Map<IEnumerable<ExpenseGetDto>>(expenses));
        }

        [HttpGet("{id}", Name = "GetExpense")]
        [Produces("application/json", "application/xml")]
        [ProducesResponseType(typeof(ExpenseGetDto), 200)]
        [ProducesResponseType(typeof(ProblemDetails), 404)]
        public ActionResult<ExpenseGetDto> GetExpense(int id)
        {
            var expense = _expenseRepository.GetExpense(id);

            if (expense == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ExpenseGetDto>(expense));
        }

        [HttpGet("categories")]
        [Produces("application/json", "application/xml")]
        [ProducesResponseType(typeof(List<EnumValue>), 200)]
        public IActionResult GetExpenseCategories()
        {
            var categories = EnumExtensions.GetValues<ExpenseCategory>();

            return Ok(categories);
        }

        [HttpPost]
        [Consumes("application/json", "application/xml")]
        [Produces("application/json", "application/xml")]
        [ProducesResponseType(typeof(ExpenseGetDto), 201)]
        [ProducesResponseType(typeof(ProblemDetails), 400)]
        public ActionResult<ExpenseGetDto> CreateExpense([FromBody] ExpenseCreateDto newExpense)
        {
            var newExpenseEntity = _mapper.Map<Expense>(newExpense);

            _expenseRepository.AddExpense(newExpenseEntity);
            _expenseRepository.Save();
            
            var createdExpense = _mapper.Map<ExpenseGetDto>(newExpenseEntity);

            return CreatedAtRoute("GetExpense", new { id = createdExpense.Id }, createdExpense);
        }

        [HttpPut("{id}")]
        [Consumes("application/json", "application/xml")]
        [Produces("application/json", "application/xml")]
        [ProducesResponseType(typeof(EmptyResult), 204)]
        [ProducesResponseType(typeof(ProblemDetails), 400)]
        [ProducesResponseType(typeof(ProblemDetails), 404)]
        public IActionResult UpdateExpense(int id, [FromBody] ExpenseUpdateDto updatedExpense)
        {
            var expense = _expenseRepository.GetExpense(id);

            if (expense == null)
            {
                return NotFound();
            }

            _mapper.Map(updatedExpense, expense);

            _expenseRepository.UpdateExpense(expense);
            _expenseRepository.Save();

            return NoContent();
        }

        [HttpPatch("{id}")]
        [Consumes("application/json", "application/xml")]
        [Produces("application/json", "application/xml")]
        [ProducesResponseType(typeof(EmptyResult), 204)]
        [ProducesResponseType(typeof(ProblemDetails), 400)]
        [ProducesResponseType(typeof(ProblemDetails), 404)]
        public IActionResult PartiallyUpdateExpense(int id, [FromBody] JsonPatchDocument<ExpenseUpdateDto> patchDocument)
        {
            var expense = _expenseRepository.GetExpense(id);

            if (expense == null)
            {
                return NotFound();
            }

            var expenseToPatch = _mapper.Map<ExpenseUpdateDto>(expense);

            patchDocument.ApplyTo(expenseToPatch, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (!TryValidateModel(expenseToPatch))
            {
                return BadRequest();
            }

            _mapper.Map(expenseToPatch, expense);

            _expenseRepository.UpdateExpense(expense);
            _expenseRepository.Save();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Produces("application/json", "application/xml")]
        [ProducesResponseType(typeof(EmptyResult), 204)]
        [ProducesResponseType(typeof(ProblemDetails), 404)]
        public IActionResult DeleteExpense(int id)
        {
            var expense = _expenseRepository.GetExpense(id);

            if (expense == null)
            {
                return NotFound();
            }

            _expenseRepository.DeleteExpense(expense);
            _expenseRepository.Save();

            return NoContent();
        }

        [HttpOptions]
        [ProducesResponseType(200)]
        public IActionResult GetExpensesOptions()
        {
            Response.Headers.Add("Allow", "GET,OPTIONS,POST");
            return Ok();
        }
    }
}
