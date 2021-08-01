using MyExpenses.Core.Entities;
using MyExpenses.Data.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace MyExpenses.Data.Services
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly MyExpensesDbContext _context;

        public ExpenseRepository(MyExpensesDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Expense> GetExpenses()
        {
            return _context.Expenses.ToList();
        }

        public Expense GetExpense(int id)
        {
            return _context.Expenses.
                FirstOrDefault(e => e.Id == id);
        }

        public void AddExpense(Expense newExpense)
        {
            if(newExpense != null)
            {
                _context.Expenses.Add(newExpense);
            }
        }

        public void UpdateExpense(Expense updatedExpense)
        {
            //no need to do anything there
            //enities are tracked
        }

        public void DeleteExpense(Expense deleteExpense)
        {
            _context.Expenses.Remove(deleteExpense);
        }

        public bool Save()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
