# Expense Tracker — Personal Expense Management

Ứng dụng web ghi chép và theo dõi chi tiêu cá nhân, xây dựng với **HTML, CSS và JavaScript (ES Modules)**. Dự án đang được nâng cấp sang **TypeScript với strict mode** nhằm cải thiện khả năng bảo trì, độ an toàn kiểu dữ liệu và chất lượng mã nguồn.

> **Trạng thái hiện tại:** Phiên bản JavaScript hoạt động với các chức năng cốt lõi. Việc chuyển đổi sang TypeScript và thống kê theo danh mục đang được phát triển.

## Tính năng

### Có sẵn trong JavaScript starter

- **Thêm khoản chi:** Nhập tên khoản chi, số tiền (VND) và danh mục.
- **Kiểm tra dữ liệu đầu vào:** Không chấp nhận tên rỗng, số tiền không phải số nguyên dương hoặc danh mục không hợp lệ.
- **Danh sách khoản chi:** Hiển thị mô tả, số tiền, danh mục và ngày tạo; sắp xếp giao dịch mới lên trước.
- **Xóa khoản chi:** Xóa một giao dịch khỏi danh sách.
- **Tổng quan chi tiêu:** Tính tổng số tiền và đếm số giao dịch.
- **Lưu trữ trên trình duyệt:** Sử dụng `localStorage` để giữ lại dữ liệu sau khi tải lại trang.
- **Giao diện responsive:** Tương thích với các kích thước màn hình khác nhau.

### Phần tôi trực tiếp phát triển (đang thực hiện)

- [ ] **TypeScript migration:** Chuyển các module `.js` sang `.ts`, khai báo `Expense`, `ExpenseCategory`, `ExpenseInput` và bật kiểm tra kiểu nghiêm ngặt cho mã ứng dụng.
- [ ] **Category filtering:** Lọc danh sách theo danh mục mà không thay đổi dữ liệu gốc.
- [ ] **Category totals:** Tính tổng số tiền theo danh mục đang chọn.
- [ ] **Runtime validation:** Xác thực cấu trúc dữ liệu đọc từ `localStorage` thay vì chỉ tin tưởng kết quả `JSON.parse()`.
- [ ] **Code refactoring:** Cải thiện naming, hạn chế mutation không cần thiết, tách hàm lớn và giảm lặp mã.

## Công nghệ sử dụng

| Công nghệ | Vai trò |
| --- | --- |
| HTML5, CSS3 | Cấu trúc và giao diện responsive |
| JavaScript (ES Modules) | Xử lý DOM, sự kiện và nghiệp vụ chi tiêu |
| Browser `localStorage` | Lưu dữ liệu cục bộ, không cần backend |
| Vite | Development server và build |
| TypeScript | Đã cấu hình `strict: true`; đang trong quá trình chuyển đổi source code |

## Cài đặt và chạy dự án

**Yêu cầu:** Node.js tương thích với Vite 7 (Node.js **20.19+** hoặc **22.12+**).

```bash
# Cài dependencies
npm install

# Chạy môi trường phát triển
npm run dev
```

Mở đường dẫn được hiển thị trong terminal (thường là `http://localhost:5173`).

```bash
# Kiểm tra TypeScript
npm run typecheck

# Build phiên bản production
npm run build
```

**Lưu ý:** Ở phiên bản JavaScript ban đầu, lệnh `typecheck` **chưa kiểm tra các module `.js`**. Phạm vi strict type checking sẽ hoàn thiện sau khi chuyển source code ứng dụng sang TypeScript.

## Cấu trúc dự án

```text
expense-tracker/
├── index.html                  # Trang giao diện
├── package.json               # Scripts và dependencies
├── tsconfig.json              # Cấu hình TypeScript strict mode
├── README.md
└── src/
    ├── main.js                # DOM, event handlers, render danh sách
    ├── expense-utils.js       # Tạo giao dịch, tổng tiền, định dạng dữ liệu
    ├── storage.js             # Đọc/ghi localStorage
    ├── types.ts               # Khung định nghĩa các kiểu TypeScript
    └── style.css              # Giao diện responsive
```

*Cấu trúc sẽ được cập nhật khi quá trình chuyển đổi sang TypeScript hoàn thành.*

## Cách ứng dụng hoạt động

1. Người dùng nhập thông tin khoản chi và gửi form.
2. Ứng dụng kiểm tra dữ liệu trước khi tạo giao dịch với `id` và `createdAt`.
3. Danh sách giao dịch được cập nhật và lưu vào `localStorage`.
4. Giao diện hiển thị lại tổng chi tiêu, số giao dịch và lịch sử khoản chi.
5. Khi tải lại trang, ứng dụng đọc dữ liệu từ `localStorage` để khôi phục danh sách.

**Giới hạn hiện tại:** Dữ liệu chỉ nằm trong trình duyệt đang sử dụng; chưa có tài khoản, cơ sở dữ liệu hay đồng bộ giữa các thiết bị. Dữ liệu lưu trữ hiện mới được kiểm tra ở mức cơ bản khi đọc; việc xác thực từng trường là mục tiêu nâng cấp.

## Hướng phát triển

Tôi sẽ phát triển các tính năng mới trên nhánh Git riêng, tạo Pull Request để review và chỉ tích hợp vào `main` khi hoàn thành. README sẽ được cập nhật theo tiến độ thực tế, giúp phân biệt phần starter với những đóng góp tôi đã hoàn thiện.

---

**Mục tiêu kỹ thuật:** Thực hành nâng cấp một ứng dụng JavaScript có sẵn sang TypeScript theo hướng rõ kiểu dữ liệu, dễ bảo trì và có khả năng mở rộng.
