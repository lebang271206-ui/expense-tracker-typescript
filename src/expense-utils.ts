import type { Expense, ExpenseCategory, ExpenseInput } from "./types";

export const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  food: "Ăn uống",
  transport: "Di chuyển",
  shopping: "Mua sắm",
  bills: "Hóa đơn",
  other: "Khác",
};

export const CATEGORY_ICONS: Record<ExpenseCategory, string> = {
  food: "🍜",
  transport: "🚌",
  shopping: "🛍️",
  bills: "🧾",
  other: "📦",
};

export function createExpense(description: string, amount: number, category: ExpenseCategory): Expense {
  const input: ExpenseInput = {
    description,
    amount,
    category
  };
  if (!validateExpenseInput(input)) {
    throw new Error("Invalid expense input");
  }
  return {
    id: crypto.randomUUID(),
    description,
    amount,
    category,
    createdAt: new Date().toISOString(),
  };
}

export function calculateTotal(expenses: readonly Expense[]): number {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(isoDate:string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
  }).format(new Date(isoDate));
}

function validateExpenseInput(
  input: ExpenseInput
): boolean {
  return input.description.trim().length > 0 && Number.isFinite(input.amount) && input.amount > 0;
}

