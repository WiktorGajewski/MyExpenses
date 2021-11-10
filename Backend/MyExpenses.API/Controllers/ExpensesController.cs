using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
using System.Security.Claims;

namespace MyExpenses.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/expenses")]
    public class ExpensesController : ControllerBase
    {
        private readonly IExpenseRepository _expenseRepository;
        private readonly IMapper _mapper;
        private readonly string _currentUserId;

        public ExpensesController(IExpenseRepository expenseRepository, IMapper mapper, IHttpContextAccessor httpContext)
        {
            _expenseRepository = expenseRepository;
            _mapper = mapper;
            _currentUserId = httpContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }

        [HttpGet]
        [Produces("application/json","application/xml")]
        [ProducesResponseType(typeof(PagedResponse<IEnumerable<ExpenseGetDto>>), 200)]
        [ProducesResponseType(typeof(ProblemDetails), 400)]
        [ProducesResponseType(typeof(ProblemDetails), 401)]
        public ActionResult<PagedResponse<IEnumerable<ExpenseGetDto>>> GetExpenses([FromQuery] PaginationFilter filterPage,
            [FromQuery] ExpenseFilter filter)
        {

            if ( filterPage?.PageNumber != null && filterPage?.PageSize != null )
            {
                var expenses = _expenseRepository.GetExpensesAndFilter(_currentUserId, filterPage.PageNumber.Value, filterPage.PageSize.Value,
                    filter.SearchTerm, filter.ExpenseCategory, filter.StartDate, filter.EndDate);

                return Ok(
                    PaginationHelper.CreatePagedResponse(expenses, filterPage, _expenseRepository.CountExpenses(_currentUserId, filter.SearchTerm, filter.ExpenseCategory, filter.StartDate, filter.EndDate))
                );
            }
            else
            {
                var expenses = _expenseRepository.GetAllExpensesAndFilter(_currentUserId, filter.SearchTerm, filter.ExpenseCategory, filter.StartDate, filter.EndDate);

                return Ok(
                    PaginationHelper.CreatePagedResponse(expenses, filterPage, _expenseRepository.CountExpenses(_currentUserId, filter.SearchTerm, filter.ExpenseCategory, filter.StartDate, filter.EndDate))
                );
            }
        }

        [HttpGet("{id}", Name = "GetExpense")]
        [Produces("application/json", "application/xml")]
        [ProducesResponseType(typeof(ExpenseGetDto), 200)]
        [ProducesResponseType(typeof(ProblemDetails), 401)]
        [ProducesResponseType(typeof(ProblemDetails), 403)]
        [ProducesResponseType(typeof(ProblemDetails), 404)]
        public ActionResult<ExpenseGetDto> GetExpense(int id)
        {
            var expense = _expenseRepository.GetExpense(id);

            if (expense == null)
            {
                return NotFound();
            }

            if (expense.UserId != _currentUserId)
            {
                return Forbid();
            }

            return Ok(_mapper.Map<ExpenseGetDto>(expense));
        }

        [HttpGet("categories")]
        [Produces("application/json", "application/xml")]
        [ProducesResponseType(typeof(List<EnumValue>), 200)]
        [ProducesResponseType(typeof(ProblemDetails), 401)]
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
        [ProducesResponseType(typeof(ProblemDetails), 401)]
        public ActionResult<ExpenseGetDto> CreateExpense([FromBody] ExpenseCreateDto newExpense)
        {
            var newExpenseEntity = _mapper.Map<Expense>(newExpense);

            _expenseRepository.AddExpense(_currentUserId, newExpenseEntity);
            _expenseRepository.Save();
            
            var createdExpense = _mapper.Map<ExpenseGetDto>(newExpenseEntity);

            return CreatedAtRoute("GetExpense", new { id = createdExpense.Id }, createdExpense);
        }

        [HttpPut("{id}")]
        [Consumes("application/json", "application/xml")]
        [Produces("application/json", "application/xml")]
        [ProducesResponseType(typeof(EmptyResult), 204)]
        [ProducesResponseType(typeof(ProblemDetails), 400)]
        [ProducesResponseType(typeof(ProblemDetails), 401)]
        [ProducesResponseType(typeof(ProblemDetails), 403)]
        [ProducesResponseType(typeof(ProblemDetails), 404)]
        public IActionResult UpdateExpense(int id, [FromBody] ExpenseUpdateDto updatedExpense)
        {
            var expense = _expenseRepository.GetExpense(id);

            if (expense == null)
            {
                return NotFound();
            }

            if (expense.UserId != _currentUserId)
            {
                return Forbid();
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
        [ProducesResponseType(typeof(ProblemDetails), 401)]
        [ProducesResponseType(typeof(ProblemDetails), 403)]
        [ProducesResponseType(typeof(ProblemDetails), 404)]
        public IActionResult PartiallyUpdateExpense(int id, [FromBody] JsonPatchDocument<ExpenseUpdateDto> patchDocument)
        {
            var expense = _expenseRepository.GetExpense(id);

            if (expense == null)
            {
                return NotFound();
            }

            if (expense.UserId != _currentUserId)
            {
                return Forbid();
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
        [ProducesResponseType(typeof(ProblemDetails), 401)]
        [ProducesResponseType(typeof(ProblemDetails), 403)]
        [ProducesResponseType(typeof(ProblemDetails), 404)]
        public IActionResult DeleteExpense(int id)
        {
            var expense = _expenseRepository.GetExpense(id);

            if (expense == null)
            {
                return NotFound();
            }

            if(expense.UserId != _currentUserId)
            {
                return Forbid();
            }

            _expenseRepository.DeleteExpense(expense);
            _expenseRepository.Save();

            return NoContent();
        }

        [HttpOptions]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(ProblemDetails), 401)]
        public IActionResult GetExpensesOptions()
        {
            Response.Headers.Add("Allow", "GET,OPTIONS,POST");
            return Ok();
        }
    }
}
