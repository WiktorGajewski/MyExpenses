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
        [MaxLength(100)]
        public string Name { get; set; }

        [Range(0, double.MaxValue)]
        public double Value { get; set; }
    }
}
