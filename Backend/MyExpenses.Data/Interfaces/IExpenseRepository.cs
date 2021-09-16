using MyExpenses.Core.Entities;
using System.Collections.Generic;

namespace MyExpenses.Data.Interfaces
{
    public interface IExpenseRepository
    {
        IEnumerable<Expense> GetExpenses(int pageNumber, int pageSize);
        IEnumerable<Expense> GetExpensesAndFilter(int pageNumber, int pageSize, string searchTerm, ExpenseCategory category);
        IEnumerable<Expense> GetAllExpenses();
        int CountAllExpenses();
        int CountExpenses(string searchTerm, ExpenseCategory category);
        Expense GetExpense(int id);
        void AddExpense(Expense newExpense);
        void UpdateExpense(Expense updatedExpense);
        void DeleteExpense(Expense deleteExpense);
        bool Save();
    }
}
