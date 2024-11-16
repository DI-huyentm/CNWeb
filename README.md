# CNWeb

## Cách chạy dự án trên localhost

### Điều kiện cần:

- Đã cài đặt Docker và Docker Compose trên máy.

### Cài đặt Docker và Docker Compose:

- [Hướng dẫn cài đặt Docker](https://docs.docker.com/get-docker/)
- [Hướng dẫn cài đặt Docker Compose](https://docs.docker.com/compose/install/)

### Các bước thực hiện:

1. Mở terminal và chuyển đến thư mục dự án:

   ```sh
   cd /path/to/project
   ```

2. Chạy lệnh sau để xây dựng và khởi động các container:

   ```sh
   docker-compose up --build
   ```

3. Bật browser và nhập vào URL

   ```sh
   http://localhost:5173
   ```
