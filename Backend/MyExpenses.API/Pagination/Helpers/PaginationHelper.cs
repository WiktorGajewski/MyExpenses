using MyExpenses.API.Filters;
using MyExpenses.API.Pagination.Wrappers;
using System;
using System.Collections.Generic;

namespace MyExpenses.API.Pagination.Helpers
{
    public class PaginationHelper
    {
        public static PagedResponse<IEnumerable<T>> CreatePagedResponse<T>(
            IEnumerable<T> pagedData,
            PaginationFilter filter,
            int totalRecords)
        {

            int? roundedTotalPages = null;

            if (filter?.PageSize != null)
            {
                var totalPages = ((double)totalRecords / (double)filter.PageSize);

                roundedTotalPages = Convert.ToInt32(Math.Ceiling(totalPages));
            }

            return new PagedResponse<IEnumerable<T>>(pagedData,
                filter?.PageNumber,
                filter?.PageSize,
                roundedTotalPages,
                totalRecords);
        }
    }
}
