using MyExpenses.Core.Entities;

namespace MyExpenses.API.Filters
{
    public class ExpenseFilter
    {
        public string SearchTerm { get; set; }

        public ExpenseCategory ExpenseCategory { get; set; }

        public ExpenseFilter()
        {
            SearchTerm = null;
            ExpenseCategory = ExpenseCategory.None;
        }
    }
}
