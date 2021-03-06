export interface IExpense{
    id: number,
    description: string,
    value: number,
    date: Date,
    category: CategoryType
}

export enum CategoryType{
    "Housing" = 1,
    "Transportation",
    "Taxes",
    "Food",
    "Child_Expenses",
    "Healthcare",
    "Insurance",
    "Utilities",
    "Miscellaneous",
    "Consumer_Debt",
    "Personal_Care",
    "Pets",
    "Giving",
    "Clothes",
    "Home_Supplies",
    "Gifts",
    "Fun",
    "Memberships",
    "Savings"
}