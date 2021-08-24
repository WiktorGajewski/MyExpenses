using MyExpenses.Core.Entities;
using System.Collections.Generic;

namespace MyExpenses.Data.Interfaces
{
    public interface IExpenseRepository
    {
        IEnumerable<Expense> GetExpenses(int pageNumber, int pageSize);
        IEnumerable<Expense> GetAllExpenses();
        int CountExpenses();
        Expense GetExpense(int id);
        void AddExpense(Expense newExpense);
        void UpdateExpense(Expense updatedExpense);
        void DeleteExpense(Expense deleteExpense);
        bool Save();
    }
}
