using System.ComponentModel.DataAnnotations;

namespace MyExpenses.API.Resources
{
    public class ExpenseUpdateDto
    {
        [Required(AllowEmptyStrings = false)]
        [MaxLength(100)]
        public string Name { get; set; }

        [Range(0, double.MaxValue)]
        public double Value { get; set; }
    }
}
