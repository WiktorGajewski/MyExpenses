using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyExpenses.Core.Entities;

namespace MyExpenses.Data
{
    public class MyExpensesDbContext : IdentityDbContext<User>
    {
        public DbSet<Expense> Expenses { get; set; }

        public MyExpensesDbContext(DbContextOptions<MyExpensesDbContext> options)
            :base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Expense>(entity =>
            {
                entity.HasOne(e => e.User)
                    .WithMany(u => u.Expenses)
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
