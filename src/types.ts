export type ExpenseCategory = "food" | "transport" | "shopping" | "bills" | "other";
export type Expense = {
    id: string;
    description: string;
    amount: number;
    category: ExpenseCategory;
    createdAt: string;
};

export type ExpenseInput = Omit<Expense, "id" | "createdAt">;
