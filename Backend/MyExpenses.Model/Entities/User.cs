using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace MyExpenses.Core.Entities
{
    public class User : IdentityUser
    {
        public ICollection<Expense> Expenses;

        public User()
        {
            Expenses = new List<Expense>();
        }
    }
}
