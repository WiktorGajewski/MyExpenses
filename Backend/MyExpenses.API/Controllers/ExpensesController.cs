using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using MyExpenses.API.Extensions;
using MyExpenses.API.Resources;
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
        [HttpHead]
        public ActionResult<IEnumerable<ExpenseGetDto>> GetExpenses()
        {
            var expenses = _expenseRepository.GetExpenses();

            return Ok(_mapper.Map<IEnumerable<ExpenseGetDto>>(expenses));
        }

        [HttpGet("{id}", Name = "GetExpense")]
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
        public IActionResult GetExpenseCategories()
        {
            var categories = EnumExtensions.GetValues<ExpenseCategory>();

            return Ok(categories);
        }

        [HttpPost]
        public ActionResult<ExpenseGetDto> CreateExpense([FromBody] ExpenseCreateDto newExpense)
        {
            var newExpenseEntity = _mapper.Map<Expense>(newExpense);

            _expenseRepository.AddExpense(newExpenseEntity);
            _expenseRepository.Save();
            
            var createdExpense = _mapper.Map<ExpenseGetDto>(newExpenseEntity);

            return CreatedAtRoute("GetExpense", new { id = createdExpense.Id }, createdExpense);
        }

        [HttpPut("{id}")]
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
        public IActionResult GetExpensesOptions()
        {
            Response.Headers.Add("Allow", "GET,OPTIONS,POST");
            return Ok();
        }
    }
}
