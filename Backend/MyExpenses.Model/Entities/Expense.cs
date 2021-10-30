using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyExpenses.Core.Entities
{
    public class Expense
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(AllowEmptyStrings = false)]
        [MaxLength(200)]
        public string Description { get; set; }

        [Range(0, double.MaxValue)]
        public double Value { get; set; }

        public DateTime Date { get; set; }

        public ExpenseCategory Category { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }
    }
}
