using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace MyExpenses.API.Controllers
{
    [ApiController]
    [Route("api/expenses")]
    public class ExpensesController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetExpenses()
        {
            return Ok(InMemoryDataStore.Current.Expenses);
        }

        [HttpGet("{id}")]
        public IActionResult GetExpense(int id)
        {
            var expense = InMemoryDataStore.Current.Expenses.FirstOrDefault(e => e.Id == id);

            if(expense == null)
            {
                return NotFound();
            }

            return Ok(expense);
        }
    }
}
