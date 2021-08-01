using MyExpenses.Core.Entities;
using System;

namespace MyExpenses.API.Resources
{
    public class ExpenseGetDto
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public double Value { get; set; }

        public DateTime Date { get; set; }

        public ExpenseCategory Category { get; set; }
    }
}
