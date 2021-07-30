using MyExpenses.API.Models;
using System.Collections.Generic;

namespace MyExpenses.API
{
    public class InMemoryDataStore
    {
        public static InMemoryDataStore Current { get; } = new InMemoryDataStore();

        public List<ExpenseGet> Expenses { get; set; }

        public InMemoryDataStore()
        {
            Expenses = new List<ExpenseGet>()
            {
                new ExpenseGet()
                {
                    Id = 1,
                    Name = "Example 1",
                    Value = 500
                },
                new ExpenseGet()
                {
                    Id = 2,
                    Name = "Example 2",
                    Value = 350
                },
                new ExpenseGet()
                {
                    Id = 3,
                    Name = "Example 3",
                    Value = 700
                },
                new ExpenseGet()
                {
                    Id = 4,
                    Name = "Example 4",
                    Value = 1000
                },
                new ExpenseGet()
                {
                    Id = 5,
                    Name = "Example 5",
                    Value = 100
                }
            };
        }
    }
}
