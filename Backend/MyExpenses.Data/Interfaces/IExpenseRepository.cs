using MyExpenses.Core.Entities;
using System;
using System.Collections.Generic;

namespace MyExpenses.Data.Interfaces
{
    public interface IExpenseRepository
    {
        IEnumerable<Expense> GetExpenses(int pageNumber, int pageSize);
        IEnumerable<Expense> GetExpensesAndFilter(int pageNumber, int pageSize, string searchTerm, ExpenseCategory category, DateTime? startDate, DateTime? endDate);
        IEnumerable<Expense> GetAllExpenses();
        IEnumerable<Expense> GetAllExpensesAndFilter(string searchTerm, ExpenseCategory category, DateTime? startDate, DateTime? endDate);
        int CountAllExpenses();
        int CountExpenses(string searchTerm, ExpenseCategory category, DateTime? startDate, DateTime? endDate);
        Expense GetExpense(int id);
        void AddExpense(Expense newExpense);
        void UpdateExpense(Expense updatedExpense);
        void DeleteExpense(Expense deleteExpense);
        bool Save();
    }
}
