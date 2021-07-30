using AutoMapper;

namespace MyExpenses.API.Profiles
{
    public class ExpenseProfile : Profile
    {
        public ExpenseProfile()
        {
            CreateMap<Core.Entities.Expense, Resources.ExpenseGetDto>();

            CreateMap<Resources.ExpenseCreateDto, Core.Entities.Expense>();

            CreateMap<Resources.ExpenseUpdateDto, Core.Entities.Expense>().ReverseMap();
        }
    }
}
