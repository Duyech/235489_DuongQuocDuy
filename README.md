# Hệ thống quản lý thiết bị phòng học

**Mô tả đề tài:** Ứng dụng quản lý thông tin thiết bị phòng học, theo dõi tình trạng sử dụng và cập nhật thiết bị trên nền tảng đám mây.
**Công nghệ sử dụng:** React, Node.js, Express, MongoDB Atlas, Git/GitHub, Docker, Render.

**Cấu trúc dự án:**
- `/frontend`: Giao diện web người dùng (React).
- `/backend`: API máy chủ xử lý logic (Node.js, Express) và kết nối cơ sở dữ liệu.

**Hướng dẫn cài đặt và khởi chạy:**
1. Cài đặt thư viện: Chạy lệnh `npm install` tại cả hai thư mục `frontend` và `backend`.
2. Cấu hình: Tạo file `.env` cho backend chứa `MONGO_URI` và `PORT`. Tạo file `.env` cho frontend chứa `VITE_API_URL`.
3. Khởi chạy: Chạy `node server.js` tại backend và `npm run dev` tại frontend.
## Link triển khai hệ thống
- **Render Backend API:** https://api-235489.onrender.com/api/devices
- **Render Frontend Web:** https://web-235489.onrender.com/
- **Docker Hub Backend:** https://hub.docker.com/r/duyech/backend
- **Docker Hub Frontend:** https://hub.docker.com/r/duyech/frontend