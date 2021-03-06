using MyExpenses.Core.Entities;
using System;
using System.ComponentModel.DataAnnotations;

namespace MyExpenses.Application.DataTransferObjects
{
    public class ExpenseUpdateDto
    {
        [Required(AllowEmptyStrings = false)]
        [MaxLength(200)]
        public string Description { get; set; }

        [Range(0, double.MaxValue)]
        public double Value { get; set; }

        public DateTime Date { get; set; }

        public ExpenseCategory Category { get; set; }
    }
}
