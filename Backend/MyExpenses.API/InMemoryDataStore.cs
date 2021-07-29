using MyExpenses.API.Models;
using System.Collections.Generic;

namespace MyExpenses.API
{
    public class InMemoryDataStore
    {
        public static InMemoryDataStore Current { get; } = new InMemoryDataStore();

        public List<Expense> Expenses { get; set; }

        public InMemoryDataStore()
        {
            Expenses = new List<Expense>()
            {
                new Expense()
                {
                    Id = 1,
                    Name = "Example 1",
                    Value = 500
                },
                new Expense()
                {
                    Id = 2,
                    Name = "Example 2",
                    Value = 350
                },
                new Expense()
                {
                    Id = 3,
                    Name = "Example 3",
                    Value = 700
                },
                new Expense()
                {
                    Id = 4,
                    Name = "Example 4",
                    Value = 1000
                },
                new Expense()
                {
                    Id = 5,
                    Name = "Example 5",
                    Value = 100
                }
            };
        }
    }
}
