import {
  CATEGORY_ICONS,
  CATEGORY_LABELS,
  calculateTotal,
  createExpense,
  formatDate,
  formatMoney,
} from "./expense-utils.js";
import { loadExpenses, saveExpenses } from "./storage.js";

const form = document.querySelector("#expense-form");
const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const categorySelect = document.querySelector("#category");
const errorMessage = document.querySelector("#form-error");
const expenseList = document.querySelector("#expense-list");
const emptyState = document.querySelector("#empty-state");
const totalAmount = document.querySelector("#total-amount");
const expenseCount = document.querySelector("#expense-count");


let expenses = loadExpenses();

function renderExpenses() {
  expenseList.replaceChildren();
  totalAmount.textContent = formatMoney(calculateTotal(expenses));
  expenseCount.textContent = String(expenses.length);
  emptyState.hidden = expenses.length > 0;

  expenses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  for (const expense of expenses) {
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

function showError(message) {
  errorMessage.textContent = message;
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

  if (!Object.hasOwn(CATEGORY_LABELS, category)) {
    showError("Danh mục không hợp lệ.");
    return;
  }

  const newExpense = createExpense(description, amount, category);

  expenses.push(newExpense);
  saveExpenses(expenses);
  renderExpenses();
  form.reset();
  descriptionInput.focus();
});

expenseList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-delete-id]");
  if (!button) return;

  const id = button.dataset.deleteId;
  expenses = expenses.filter((expense) => expense.id !== id);
  saveExpenses(expenses);
  renderExpenses();
});

renderExpenses();
