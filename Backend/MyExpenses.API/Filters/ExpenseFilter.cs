using MyExpenses.Core.Entities;
using System;

namespace MyExpenses.API.Filters
{
    public class ExpenseFilter
    {
        public string SearchTerm { get; set; }

        public ExpenseCategory ExpenseCategory { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public ExpenseFilter()
        {
            SearchTerm = null;
            ExpenseCategory = ExpenseCategory.None;
            StartDate = null;
            EndDate = null;
        }
    }
}
