# Domain Configuration for presentationlab.org

## 🌐 Your Domain Setup

**Frontend URL**: `https://frontend.presentationlab.org`
**Backend URL**: `https://backend.presentationlab.org` *(assumed - please confirm your actual backend domain)*

## ✅ Changes Made

1. **CORS Configuration**: Updated to allow requests from your specific frontend domain
2. **API URL**: Set frontend to connect to your backend domain
3. **Allowed Hosts**: Configured Django to accept requests to your backend domain
4. **Environment Variables**: Updated for production deployment

## 📋 Dokploy Environment Variables

When deploying in Dokploy, set these environment variables:

### Required Variables:
```bash
# Security
SECRET_KEY=your-super-secure-django-secret-key
DB_PASSWORD=your-secure-database-password

# Domain Configuration
CORS_ALLOWED_ORIGINS=https://frontend.presentationlab.org
ALLOWED_HOSTS=backend.presentationlab.org,localhost
VITE_API_URL=https://backend.presentationlab.org

# Production Settings
DEBUG=0
```

### Optional Variables (with defaults):
```bash
DB_NAME=postgres
DB_USER=postgres
BACKEND_PORT=8000
FRONTEND_PORT=3000
```

## 🔧 Dokploy Setup Instructions

1. **Create Two Applications in Dokploy:**
   - **Backend App**: Deploy to `backend.presentationlab.org`
   - **Frontend App**: Deploy to `frontend.presentationlab.org`

2. **Or Use Single Compose App:**
   - Deploy the entire stack and configure domain routing in Dokploy
   - Point `frontend.presentationlab.org` to the frontend service
   - Point `backend.presentationlab.org` to the backend service

## ⚠️ Important Notes

1. **Backend Domain**: I assumed `backend.presentationlab.org` - please update if different
2. **SSL Certificates**: Dokploy will handle HTTPS certificates automatically
3. **DNS Configuration**: Make sure your DNS points to your Dokploy server:
   - `frontend.presentationlab.org` → Dokploy server IP
   - `backend.presentationlab.org` → Dokploy server IP

## 🔍 If Backend Domain is Different

If your backend will be at a different URL (like `api.presentationlab.org` or `app-backend.presentationlab.org`), update these files:

1. `.env` file - change `VITE_API_URL` and `ALLOWED_HOSTS`
2. `docker-compose.yml` - update the VITE_API_URL default value
3. Dokploy environment variables

## ✅ Ready to Deploy

Your configuration is now optimized for:
- Frontend: `https://frontend.presentationlab.org`
- Backend: `https://backend.presentationlab.org`
- Secure CORS policy
- Production-ready settings