# Extend JWT Token Expiration

## Prompt
```
Update the JWT token expiration settings to keep users logged in for [TIME_PERIOD]. 

Current settings:
- Access token: 7 days
- Refresh token: 14 days

Please update both backend JWT configuration and add any necessary frontend enhancements for better user experience.
```

## Usage Examples

### 30 Days (Recommended for most apps)
```
Update the JWT token expiration settings to keep users logged in for 30 days.
```

### 90 Days (Long-term applications)
```
Update the JWT token expiration settings to keep users logged in for 90 days.
```

### 6 Months (Enterprise/Internal tools)
```
Update the JWT token expiration settings to keep users logged in for 6 months.
```

### Custom Duration
```
Update the JWT token expiration settings to keep users logged in for 2 weeks.
```

## What This Prompt Will Do

1. **Backend Changes**:
   - Update `SIMPLE_JWT` settings in Django `settings.py`
   - Set appropriate access and refresh token lifetimes
   - Maintain security best practices (refresh token > access token)

2. **Frontend Enhancements** (Optional):
   - Update token expiration warning thresholds
   - Adjust warning display timing based on new duration
   - Ensure smooth user experience with longer sessions

## Detailed Implementation Steps

### Backend Changes (Required)

#### 1. Update Django JWT Settings
**File**: `django-rest-api/backend/backend/settings.py`

**Current Configuration** (lines ~44-47):
```python
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME_MINUTES": timedelta(days=7),
    "REFRESH_TOKEN_LIFETIME_DAYS": timedelta(days=14),
}
```

**Update to** (example for 30 days):
```python
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME_MINUTES": timedelta(days=30),
    "REFRESH_TOKEN_LIFETIME_DAYS": timedelta(days=60),  # Always 2x access token
}
```

**Time Period Examples**:
- **2 weeks**: `timedelta(days=14)` access, `timedelta(days=28)` refresh
- **30 days**: `timedelta(days=30)` access, `timedelta(days=60)` refresh
- **90 days**: `timedelta(days=90)` access, `timedelta(days=180)` refresh
- **6 months**: `timedelta(days=180)` access, `timedelta(days=360)` refresh

### Frontend Changes (Optional but Recommended)

#### 2. Update Token Warning Component
**File**: `react-shadcn-ui/src/components/TokenExpirationWarning.jsx`

**Current Warning Threshold** (line ~21):
```javascript
// Show warning if less than 2 days remaining
if (daysLeft <= 2 && daysLeft > 0) {
    setShowWarning(true);
}
```

**Update Based on Token Duration**:
- **30 days**: Show warning at 3-5 days remaining
- **90 days**: Show warning at 7-10 days remaining  
- **6 months**: Show warning at 14-30 days remaining

**Example for 30-day tokens**:
```javascript
// Show warning if less than 5 days remaining
if (daysLeft <= 5 && daysLeft > 0) {
    setShowWarning(true);
}
```

#### 3. Update Warning Check Interval (Optional)
**File**: `react-shadcn-ui/src/components/TokenExpirationWarning.jsx`

**Current Check Interval** (line ~28):
```javascript
// Check every hour
const interval = setInterval(checkTokenExpiration, 60 * 60 * 1000);
```

**For Longer Tokens, Consider**:
- **30+ days**: Check every 6-12 hours
- **90+ days**: Check once daily

**Example for longer intervals**:
```javascript
// Check every 6 hours for long-lived tokens
const interval = setInterval(checkTokenExpiration, 6 * 60 * 60 * 1000);
```

### No Changes Needed In:

- **API Configuration**: Axios interceptors will work with any token duration
- **ProtectedRoute Component**: Already handles token validation dynamically
- **Authentication Views**: Login/Register components work with any token lifetime
- **Backend URLs/Views**: JWT views automatically use the new settings

## Common Configuration Examples

### Development/Testing (2 weeks)
```python
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME_MINUTES": timedelta(days=14),
    "REFRESH_TOKEN_LIFETIME_DAYS": timedelta(days=28),
}
```
Frontend warning: 2-3 days before expiration

### Standard Web Apps (30 days) 
```python
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME_MINUTES": timedelta(days=30),
    "REFRESH_TOKEN_LIFETIME_DAYS": timedelta(days=60),
}
```
Frontend warning: 5-7 days before expiration

### Long-term/Enterprise (90 days)
```python
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME_MINUTES": timedelta(days=90),
    "REFRESH_TOKEN_LIFETIME_DAYS": timedelta(days=180),
}
```
Frontend warning: 10-14 days before expiration

### Internal Tools (6 months)
```python
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME_MINUTES": timedelta(days=180),
    "REFRESH_TOKEN_LIFETIME_DAYS": timedelta(days=360),
}
```
Frontend warning: 30 days before expiration

## Testing the Changes

### 1. Backend Testing
After updating `settings.py`:
```bash
cd django-rest-api/backend
python3 manage.py runserver
```

Test login and verify token expiration in JWT payload:
- Use browser dev tools → Application → Local Storage
- Decode the `access_token` at [jwt.io](https://jwt.io)
- Verify `exp` field matches your new duration

### 2. Frontend Testing
```bash
cd react-shadcn-ui
npm run dev
```

- Login and check token storage
- Test automatic token refresh behavior
- Verify warning appears at correct threshold (if implemented)

### 3. Token Verification
Use browser console to check token expiration:
```javascript
// In browser console
const token = localStorage.getItem('access_token');
const decoded = JSON.parse(atob(token.split('.')[1]));
const expiryDate = new Date(decoded.exp * 1000);
console.log('Token expires:', expiryDate);
```

## Security Considerations

- Longer tokens = convenience but reduced security
- Recommended maximum: 90 days for most applications
- Always use HTTPS in production
- Consider adding session activity monitoring for very long tokens
- For tokens > 30 days, consider implementing "Remember Me" checkbox instead
- Monitor for suspicious token usage patterns in production logs