using System;
using System.ComponentModel.DataAnnotations;

namespace MyExpenses.API.Filters
{
    public class PaginationFilter
    {
        [Range(1, int.MaxValue)]
        public int? PageNumber { get; set; }

        [Range(1, 100)]
        public int? PageSize { get; set; }

        public PaginationFilter()
        {
            PageNumber = null;
            PageSize = null;
        }
    }
}
