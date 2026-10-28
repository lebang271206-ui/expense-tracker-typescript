export const CATEGORY_LABELS = {
  food: "Ăn uống",
  transport: "Di chuyển",
  shopping: "Mua sắm",
  bills: "Hóa đơn",
  other: "Khác",
};

export const CATEGORY_ICONS = {
  food: "🍜",
  transport: "🚌",
  shopping: "🛍️",
  bills: "🧾",
  other: "📦",
};

export function createExpense(description, amount, category) {
  return {
    id: crypto.randomUUID(),
    description,
    amount,
    category,
    createdAt: new Date().toISOString(),
  };
}

export function calculateTotal(expenses) {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

export function formatMoney(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(isoDate) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
  }).format(new Date(isoDate));
}

