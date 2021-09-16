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

        public IEnumerable<Expense> GetExpenses(int pageNumber, int pageSize)
        {
            return _context.Expenses
                .OrderByDescending(e => e.Date)
                .ThenByDescending(e => e.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();
        }

        public IEnumerable<Expense> GetExpensesAndFilter(int pageNumber, int pageSize, string searchTerm, ExpenseCategory category)
        {
            if(searchTerm is null && category != ExpenseCategory.None)
            {
                return _context.Expenses
                    .Where(e => e.Category == category)
                    .OrderByDescending(e => e.Date)
                    .ThenByDescending(e => e.Id)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();
            }

            if(searchTerm is not null && category == ExpenseCategory.None)
            {
                return _context.Expenses
                    .Where(e => e.Description.Contains(searchTerm))
                    .OrderByDescending(e => e.Date)
                    .ThenByDescending(e => e.Id)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();
            }

            if (searchTerm is not null && category != ExpenseCategory.None)
            {
                return _context.Expenses
                    .Where(e => e.Category == category)
                    .Where(e => e.Description.Contains(searchTerm))
                    .OrderByDescending(e => e.Date)
                    .ThenByDescending(e => e.Id)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();
            }

            return GetExpenses(pageNumber, pageSize);
        }

        public IEnumerable<Expense> GetAllExpenses()
        {
            return _context.Expenses.ToList();
        }

        public int CountAllExpenses()
        {
            return _context.Expenses.Count();
        }

        public int CountExpenses(string searchTerm, ExpenseCategory category)
        {
            if (searchTerm is null && category != ExpenseCategory.None)
            {
                return _context.Expenses
                    .Where(e => e.Category == category)
                    .Count();
            }

            if (searchTerm is not null && category == ExpenseCategory.None)
            {
                return _context.Expenses
                    .Where(e => e.Description.Contains(searchTerm))
                    .Count();
            }

            if (searchTerm is not null && category != ExpenseCategory.None)
            {
                return _context.Expenses
                    .Where(e => e.Category == category)
                    .Where(e => e.Description.Contains(searchTerm))
                    .Count();
            }

            return CountAllExpenses();
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
