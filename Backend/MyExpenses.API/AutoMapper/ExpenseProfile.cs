using AutoMapper;
using MyExpenses.Application.DataTransferObjects;
using MyExpenses.Core.Entities;

namespace MyExpenses.API.AutoMapper
{
    public class ExpenseProfile : Profile
    {
        public ExpenseProfile()
        {
            CreateMap<Expense, ExpenseGetDto>();

            CreateMap<ExpenseCreateDto, Expense>();

            CreateMap<ExpenseUpdateDto, Expense>().ReverseMap();
        }
    }
}
