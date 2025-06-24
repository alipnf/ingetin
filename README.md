# 📝 Ingetin - Task Management App

Ingetin adalah aplikasi manajemen tugas yang dibangun dengan Next.js 15,
Firebase, dan integrasi Google Calendar. Aplikasi ini memungkinkan pengguna
untuk mengelola tugas-tugas mereka dengan mudah dan efisien.

## ✨ Fitur Utama

### 🔐 Autentikasi

- **Login/Register**: Sistem autentikasi yang aman menggunakan Firebase Auth
- **Google OAuth**: Login cepat menggunakan akun Google
- **Session Management**: Manajemen sesi yang aman dengan middleware

### 📋 Manajemen Tugas

- **Tambah Tugas**: Buat tugas baru dengan judul, deskripsi, dan deadline
- **Edit Tugas**: Ubah detail tugas yang sudah ada
- **Hapus Tugas**: Hapus tugas yang tidak diperlukan
- **Status Tugas**: Kelola status tugas (pending, in progress, completed)
- **Deadline Tracking**: Pantau deadline tugas dengan sistem reminder

### 📅 Integrasi Google Calendar

- **Sinkronisasi Otomatis**: Tugas otomatis ditambahkan ke Google Calendar
- **Reminder**: Notifikasi email dan popup untuk deadline tugas
- **Update Real-time**: Perubahan tugas akan tersinkronisasi dengan calendar

### 🎨 Tampilan Fleksibel

- **List View**: Tampilan daftar tugas yang detail dan mudah dibaca
- **Kanban View**: _(Sedang dalam pengembangan)_
- **Dark/Light Mode**: Tema yang dapat disesuaikan
- **Responsive Design**: Optimal di desktop dan mobile

## 🛠️ Teknologi yang Digunakan

### Frontend

- **Next.js 15**: Framework React dengan App Router
- **React 19**: Library UI terbaru
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **Radix UI**: Komponen UI yang accessible
- **Lucide React**: Icon library modern

### Backend & Database

- **Firebase**: Backend-as-a-Service
  - Authentication
  - Firestore Database
  - Security Rules
- **Google APIs**: Integrasi Calendar dan OAuth

### State Management & Utils

- **Zustand**: State management yang ringan
- **Next Themes**: Theme management
- **Sonner**: Toast notifications
- **Cookies Next**: Cookie management

## 🚀 Instalasi dan Setup

### Prasyarat

- Node.js (versi 18 atau lebih baru)
- PNPM package manager
- Akun Firebase
- Google Cloud Console account (untuk Calendar integration)

### 1. Clone Repository

```bash
git clone <repository-url>
cd ingetin
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Setup Environment Variables

Buat file `.env.local` di root project:

```env
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Firebase Admin (Server-side)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Setup Firebase

1. Buat project baru di [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication dengan Google provider
3. Buat Firestore database
4. Setup Security Rules untuk Firestore
5. Download service account key untuk admin SDK

### 5. Setup Google Calendar API

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Google Calendar API
3. Buat OAuth 2.0 credentials
4. Tambahkan authorized redirect URIs

### 6. Jalankan Development Server

```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📁 Struktur Project

```
ingetin/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Main app pages
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── dashboard/         # Dashboard-specific components
│   └── ui/                # Base UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── firebase/          # Firebase configuration
│   └── calendar-integration.ts
├── store/                 # Zustand stores
├── types/                 # TypeScript type definitions
└── style/                 # Global styles
```

## 🎯 Scripts

```bash
# Development
pnpm dev          # Jalankan development server dengan Turbopack

# Production
pnpm build        # Build aplikasi untuk production
pnpm start        # Jalankan production server

# Code Quality
pnpm lint         # Jalankan ESLint
```

## 🔧 Konfigurasi

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/tasks/{taskId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Middleware Configuration

Aplikasi menggunakan middleware untuk proteksi route yang memerlukan
autentikasi.

## 🤝 Kontribusi

1. Fork repository ini
2. Buat branch feature (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## 📄 Lisensi

Project ini menggunakan lisensi MIT. Lihat file `LICENSE` untuk detail lebih
lanjut.
