# Growseer App

Growseer App adalah aplikasi grosir berbasis web dengan fitur **inventory & sales management**. Aplikasi ini membantu bisnis dalam mengelola stok barang, transaksi penjualan, dan administrasi pengguna dengan lebih efisien.

## 📌 Fitur Utama

- **Manajemen Inventaris**: Tambah, edit, dan hapus produk dengan sistem pelacakan stok otomatis.
- **Manajemen Penjualan**: Proses transaksi penjualan dengan pencatatan detail.
- **Autentikasi & Otorisasi**: Sistem login dengan peran pengguna (superadmin, inventory, sales, dan customer.).
- **Log Aktivitas**: Mencatat setiap perubahan penting dalam sistem.
- **Manajemen Pengguna**: CRUD pengguna dan kontrol akses berdasarkan peran.

## 🏗️ Teknologi yang Digunakan

- **Frontend**: React.js (Vite), React Router, Context API, Tailwind CSS, Daisy UI.
- **Backend**: Node.js, Express.js, Middleware Kustom.
- **Database**: PostgreSQL, Sequelize ORM.
- **Autentikasi**: JSON Web Token (JWT).
- **File Management**: Multer.

## 🚀 Instalasi dan Penggunaan

1. **Kloning repositori**:

   ```bash
    git clone https://github.com/rioalifian12/growseer-app.git
    cd growseer-app
   ```

2. **Menjalankan Backend**:

   ```bash
   cd backend
   sesuaikan .env
   npm install
   npm start
   ```

3. **Menjalankan Frontend**:
   ```bash
   cd frontend
   sesuaikan .env
   npm install
   npm run dev
   ```

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) sebelum menjalankan perintah di atas.
