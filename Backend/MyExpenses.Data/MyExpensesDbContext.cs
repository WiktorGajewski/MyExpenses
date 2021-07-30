using Microsoft.EntityFrameworkCore;
using MyExpenses.Core.Entities;

namespace MyExpenses.Data
{
    public class MyExpensesDbContext : DbContext
    {
        public DbSet<Expense> Expenses { get; set; }

        public MyExpensesDbContext(DbContextOptions<MyExpensesDbContext> options)
            :base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
