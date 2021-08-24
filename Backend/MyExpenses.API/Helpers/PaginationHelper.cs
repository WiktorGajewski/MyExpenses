using MyExpenses.API.Filters;
using MyExpenses.API.Wrappers;
using System;
using System.Collections.Generic;

namespace MyExpenses.API.Helpers
{
    public class PaginationHelper
    {
        public static PagedResponse<IEnumerable<T>> CreatePagedResponse<T>(
            IEnumerable<T> pagedData,
            PaginationFilter filter,
            int totalRecords)
        {
            var totalPages = ((double)totalRecords / (double)filter.PageSize);
            int roundedTotalPages = Convert.ToInt32(Math.Ceiling(totalPages));

            return new PagedResponse<IEnumerable<T>>(pagedData,
                filter.PageNumber,
                filter.PageSize,
                roundedTotalPages,
                totalRecords);
        }
    }
}
