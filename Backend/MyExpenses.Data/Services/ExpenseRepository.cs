using MyExpenses.Core.Entities;
using MyExpenses.Data.Interfaces;
using System;
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

        //public IEnumerable<Expense> GetExpenses(int pageNumber, int pageSize)
        //{
        //    return _context.Expenses
        //        .OrderByDescending(e => e.Date)
        //        .ThenByDescending(e => e.Id)
        //        .Skip((pageNumber - 1) * pageSize)
        //        .Take(pageSize)
        //        .ToList();
        //}

        public IEnumerable<Expense> GetExpensesAndFilter(string userId, int pageNumber, int pageSize, string searchTerm, ExpenseCategory category, DateTime? startDate, DateTime? endDate)
        {
            var expenses = _context.Expenses.AsQueryable();

            expenses = FilterExpensesByUserId(expenses, userId);

            if(searchTerm is not null)
            {
                expenses = FilterExpensesBySearchTerm(expenses, searchTerm);
            }

            if (category != ExpenseCategory.None)
            {
                expenses = FilterExpensesByCategory(expenses, category);
            }

            if (startDate.HasValue)
            {
                expenses = FilterExpensesByStartDate(expenses, startDate.Value);
            }

            if (endDate.HasValue)
            {
                expenses = FilterExpensesByEndDate(expenses, endDate.Value);
            }

            return expenses
                    .OrderByDescending(e => e.Date)
                    .ThenByDescending(e => e.Id)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();
        }

        //public IEnumerable<Expense> GetAllExpenses()
        //{
        //    return _context.Expenses.ToList();
        //}

        public IEnumerable<Expense> GetAllExpensesAndFilter(string userId, string searchTerm, ExpenseCategory category, DateTime? startDate, DateTime? endDate)
        {
            var expenses = _context.Expenses.AsQueryable();

            expenses = FilterExpensesByUserId(expenses, userId);

            if (searchTerm is not null)
            {
                expenses = FilterExpensesBySearchTerm(expenses, searchTerm);
            }

            if (category != ExpenseCategory.None)
            {
                expenses = FilterExpensesByCategory(expenses, category);
            }

            if(startDate.HasValue)
            {
                expenses = FilterExpensesByStartDate(expenses, startDate.Value);
            }

            if (endDate.HasValue)
            {
                expenses = FilterExpensesByEndDate(expenses, endDate.Value);
            }

            return expenses.ToList();
        }

        //public int CountAllExpenses()
        //{
        //    return _context.Expenses.Count();
        //}

        public int CountExpenses(string userId, string searchTerm, ExpenseCategory category, DateTime? startDate, DateTime? endDate)
        {
            var expenses = _context.Expenses.AsQueryable();

            expenses = FilterExpensesByUserId(expenses, userId);

            if (searchTerm is not null)
            {
                expenses = FilterExpensesBySearchTerm(expenses, searchTerm);
            }

            if (category != ExpenseCategory.None)
            {
                expenses = FilterExpensesByCategory(expenses, category);
            }

            if (startDate.HasValue)
            {
                expenses = FilterExpensesByStartDate(expenses, startDate.Value);
            }

            if (endDate.HasValue)
            {
                expenses = FilterExpensesByEndDate(expenses, endDate.Value);
            }

            return expenses.Count();
        }

        public Expense GetExpense(int id)
        {
            return _context.Expenses.
                FirstOrDefault(e => e.Id == id);
        }

        public void AddExpense(string userId, Expense newExpense)
        {
            if(newExpense != null)
            {
                newExpense.UserId = userId;
                newExpense.User = _context.Users.FirstOrDefault(u => u.Id == userId);

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

        private IQueryable<Expense> FilterExpensesByCategory(IQueryable<Expense> expenses, ExpenseCategory category)
        {
            return expenses.Where(e => e.Category == category);
        }

        private IQueryable<Expense> FilterExpensesBySearchTerm(IQueryable<Expense> expenses, string searchTerm)
        {
            return expenses.Where(e => e.Description.Contains(searchTerm));
        }

        private IQueryable<Expense> FilterExpensesByStartDate(IQueryable<Expense> expenses, DateTime startDate)
        {
            return expenses.Where(e => e.Date >= startDate);
        }

        private IQueryable<Expense> FilterExpensesByEndDate(IQueryable<Expense> expenses, DateTime endDate)
        {
            return expenses.Where(e => e.Date <= endDate);
        }

        private IQueryable<Expense> FilterExpensesByUserId(IQueryable<Expense> expenses, string userId)
        {
            return expenses.Where(e => e.UserId == userId);
        }
    }
}
