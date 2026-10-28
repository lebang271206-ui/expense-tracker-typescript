import {
  CATEGORY_ICONS,
  CATEGORY_LABELS,
  calculateTotal,
  createExpense,
  formatDate,
  formatMoney,
} from "./expense-utils";
import { loadExpenses, saveExpenses } from "./storage";
import type { ExpenseCategory } from "./types";

const form = getRequiredElement<HTMLFormElement>("#expense-form");
const descriptionInput = getRequiredElement<HTMLInputElement>("#description");
const amountInput = getRequiredElement<HTMLInputElement>("#amount");
const categorySelect = getRequiredElement<HTMLSelectElement>("#category");
const errorMessage = getRequiredElement<HTMLParagraphElement>("#form-error");
const expenseList = getRequiredElement<HTMLUListElement>("#expense-list");
const emptyState = getRequiredElement<HTMLDivElement>("#empty-state");
const totalAmount = getRequiredElement<HTMLParagraphElement>("#total-amount");
const expenseCount = getRequiredElement<HTMLParagraphElement>("#expense-count");

function getRequiredElement<T extends Element>(selector: string): T{
  const element = document.querySelector<T>(selector);
  if(!element) {
    throw new Error(`không tìm thấy element: ${selector}`);
  }
  return element;
}
let expenses = loadExpenses();

function renderExpenses(): void {
  expenseList.replaceChildren();
  totalAmount.textContent = formatMoney(calculateTotal(expenses));
  expenseCount.textContent = String(expenses.length);
  emptyState.hidden = expenses.length > 0;

  const sortedExpense = [...expenses].sort((a, b) => (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime());

  for (const expense of sortedExpense) {
    const item = document.createElement("li");
    item.className = "expense-item";

    const icon = document.createElement("span");
    icon.className = "expense-icon";
    icon.textContent = CATEGORY_ICONS[expense.category] ?? "📦";

    const details = document.createElement("div");
    details.className = "expense-details";

    const name = document.createElement("strong");
    name.className = "expense-name";
    name.textContent = expense.description;

    const metadata = document.createElement("span");
    metadata.className = "expense-meta";
    metadata.textContent = `${CATEGORY_LABELS[expense.category] ?? "Khác"} · ${formatDate(expense.createdAt)}`;
    details.append(name, metadata);

    const value = document.createElement("strong");
    value.className = "expense-amount";
    value.textContent = formatMoney(expense.amount);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Xóa";
    deleteButton.dataset.deleteId = expense.id;
    deleteButton.setAttribute("aria-label", `Xóa khoản chi ${expense.description}`);

    item.append(icon, details, value, deleteButton);
    expenseList.append(item);
  }
}

function showError(message: string): void {
  errorMessage.textContent = message;
}

function isExpenseCategory(value: string): value is ExpenseCategory {
  return Object.hasOwn(CATEGORY_LABELS, value);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  showError("");

  const description = descriptionInput.value.trim();
  const amount = Number(amountInput.value);
  const category = categorySelect.value;

  if (description.length === 0) {
    showError("Vui lòng nhập tên khoản chi.");
    return;
  }

  if (!Number.isInteger(amount) || amount <= 0) {
    showError("Số tiền phải là số nguyên dương.");
    return;
  }

  if (!isExpenseCategory(category)) {
    showError("danh mục không hợp lệ");
    return;
  }
  try {
    const newExpense = createExpense
      (description,
        amount,
        category);

    const updatedExpenses = [...expenses, newExpense]
    saveExpenses(updatedExpenses);
    expenses = updatedExpenses;
    renderExpenses();
    form.reset();
    descriptionInput.focus();
  } catch (error) {
    console.error("Không thể thêm khoản chi:", error);

    showError("Thêm khoản chi thất bại. Vui lòng thử lại.");
  }

});

expenseList.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  const button = target.closest<HTMLButtonElement>("button[data-delete-id]");
  if (!button) return;

  const id = button.dataset.deleteId;
  if(!id) return;
  const  remainingExpenses = expenses.filter((expense) => expense.id !== id);
  try {
    saveExpenses(remainingExpenses);
    expenses = remainingExpenses;
    renderExpenses();
  } catch (error) {
    console.error("Không thể xóa khoản chi:", error);

    showError("Xóa khoản chi thất bại. Vui lòng thử lại.");
  }

});

renderExpenses();
