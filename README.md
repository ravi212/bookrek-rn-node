# 📚 BookRek - Book Recommendation App

A full-stack mobile application for sharing and discovering book recommendations built with React Native (Expo) and Node.js.

## 🏗️ Project Structure

```
bookrek-rn-node/
├── mobile/           # React Native Expo application
└── backend/          # Node.js Express API server
```

## ✨ Features

- 🔐 User Authentication (Login/Register)
- 📱 Modern Mobile UI with Native Wind
- 📸 Image Upload & Management
- 📚 Book Recommendations Feed
- ⭐ Rating System
- 👤 User Profiles
- 🔄 Real-time Updates

## 🛠️ Tech Stack

### Mobile App
- React Native with Expo
- NativeWind (TailwindCSS)
- Zustand (State Management)
- React Navigation
- Expo Router
- Expo Image Picker
- AsyncStorage

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- Cloudinary (Image Storage)
- Bcrypt (Password Hashing)

## 🎨 UI Components & Styling

- Custom color themes (Forest, Retro, Ocean, Blossom)
- Responsive layouts
- Custom fonts (JetBrains Mono)
- Loading states & animations
- Form validations
- Error handling
- Pull-to-refresh functionality

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB
- Cloudinary Account
- Expo CLI

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file based on `.env-template`:
```
PORT=3000
MONGODB_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Start the server:
```bash
npm run dev
```

### Mobile App Setup

1. Navigate to mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
EXPO_PUBLIC_API_URL=http://your_backend_url:3000/api
```

4. Start the app:
```bash
npx expo start
```

## 📱 App Screenshots

[Add your app screenshots here]

## 🔒 Environment Variables

### Backend
- `PORT`: Server port number
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `CLOUDINARY_*`: Cloudinary credentials

### Mobile
- `EXPO_PUBLIC_API_URL`: Backend API URL

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Illustrations from [storyset.com](https://storyset.com)
- Fonts from [jetbrains.com](https://jetbrains.com)