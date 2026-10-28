import type { Expense } from "./types";

const STORAGE_KEY = "day18-expense-tracker";

const categories: readonly string[] = [
  "food",
  "transport",
  "shopping",
  "bills",
  "other"
];

function isExpense(value: unknown): value is Expense {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return false;
  }

  return (
    "id" in value && typeof value.id === "string" &&
    "description" in value && typeof value.description === "string" && value.description.trim().length>0 &&
    "amount" in value && typeof value.amount === "number" && Number.isFinite(value.amount) && value.amount > 0 &&
    "category" in value && typeof value.category === "string" && categories.includes(value.category) &&
    "createdAt" in value && typeof value.createdAt === "string"
  );
}

export function loadExpenses(): Expense[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return [];

    const parsed: unknown = JSON.parse(raw);
    
    if(!Array.isArray(parsed)) return [];
    return parsed.filter(isExpense);
  } catch (error) {
    console.warn("Không thể đọc dữ liệu đã lưu:", error);
    return [];
  }
}

export function saveExpenses(expenses: readonly Expense[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}