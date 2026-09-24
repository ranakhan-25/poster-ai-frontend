````
# PosterAI — Frontend

PosterAI is a modern AI-powered political and event poster creation platform built with Next.js and TypeScript.

The frontend provides a responsive interface for authentication, template selection, poster creation, AI-generated poster history, profile management, and poster download.

---

## 🚀 Features

- User registration and login
- Secure HttpOnly cookie-based authentication
- Access Token + Refresh Token authentication flow
- Automatic Access Token refresh
- Protected pages and authenticated user state
- Responsive dashboard
- Poster template selection
- Poster creation form
- Multiple photo upload and preview
- AI-generated poster status tracking
- Automatic poster generation status polling
- Poster history with pagination
- Poster search
- Poster regeneration
- Poster deletion
- Poster details page
- Profile page
- Download generated posters
- Responsive mobile, tablet, and desktop UI
- Modern PosterAI branding

---

## 🛠️ Tech Stack

- Next.js
- TypeScript
- React
- Tailwind CSS
- React Query
- Lucide React
- Fetch API
- Next Image
- HttpOnly Cookies

---

## 🔒 Security

The frontend follows these authentication security practices:

* HttpOnly authentication cookies
* No token storage in localStorage
* No token storage in sessionStorage
* Credentials included in API requests
* Automatic Access Token refresh
* Protected API requests
* Automatic logout when authentication becomes invalid

Never expose backend secrets such as:

JWT_ACCESS_SECRET
JWT_REFRESH_SECRET
GEMINI_API_KEY
CLOUDINARY_API_SECRET
MONGODB_URI

## 🚀 Deployment

The production backend must also be configured with:

* Production MongoDB
* JWT secrets
* Gemini API key
* Cloudinary credentials
* Production frontend origin
* Secure cookies

---

## 📄 License

This project is developed as part of the PosterAI project.

---

## 👨‍💻 Development

PosterAI frontend is built with:

**Next.js + TypeScript + Tailwind CSS**

The project is designed to provide a simple and modern experience for creating professional AI-assisted posters.

```
