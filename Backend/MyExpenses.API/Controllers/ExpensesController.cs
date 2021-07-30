using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyExpenses.API.Models;
using MyExpenses.Data;
using System.Linq;

namespace MyExpenses.API.Controllers
{
    [ApiController]
    [Route("api/expenses")]
    public class ExpensesController : ControllerBase
    {
        private readonly DbContext dbContext;

        public ExpensesController(MyExpensesDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetExpenses()
        {
            return Ok(InMemoryDataStore.Current.Expenses);
        }

        [HttpGet("{id}", Name = "GetExpense")]
        public IActionResult GetExpense(int id)
        {
            var expense = InMemoryDataStore.Current.Expenses.FirstOrDefault(e => e.Id == id);

            if(expense == null)
            {
                return NotFound();
            }

            return Ok(expense);
        }

        [HttpPost]
        public IActionResult CreateExpense([FromBody] ExpenseCreate newExpense)
        {
            var maxId = InMemoryDataStore.Current.Expenses.Max(e => e.Id) + 1;

            var expense = new ExpenseGet()
            {
                Id = maxId,
                Name = newExpense.Name,
                Value = newExpense.Value
            };

            InMemoryDataStore.Current.Expenses.Add(expense);

            return CreatedAtRoute("GetExpense", new { id = expense.Id }, expense);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateExpense(int id, [FromBody] ExpenseUpdate updatedExpense)
        {
            var expense = InMemoryDataStore.Current.Expenses.FirstOrDefault(e => e.Id == id);

            if(expense == null)
            {
                return NotFound();
            }

            expense.Name = updatedExpense.Name;
            expense.Value = updatedExpense.Value;

            return NoContent();
        }

        [HttpPatch("{id}")]
        public IActionResult PartiallyUpdateExpense(int id, [FromBody] JsonPatchDocument<ExpenseUpdate> patchDocument)
        {
            var expense = InMemoryDataStore.Current.Expenses.FirstOrDefault(e => e.Id == id);

            if (expense == null)
            {
                return NotFound();
            }

            var expenseToPatch =
                new ExpenseUpdate()
                {
                    Name = expense.Name,
                    Value = expense.Value
                };

            patchDocument.ApplyTo(expenseToPatch, ModelState);

            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            if(!TryValidateModel(expenseToPatch))
            {
                return BadRequest();
            }

            expense.Name = expenseToPatch.Name;
            expense.Value = expenseToPatch.Value;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteExpense(int id)
        {
            var expense = InMemoryDataStore.Current.Expenses.FirstOrDefault(e => e.Id == id);

            if (expense == null)
            {
                return NotFound();
            }

            InMemoryDataStore.Current.Expenses.Remove(expense);

            return NoContent();
        }
    }
}
