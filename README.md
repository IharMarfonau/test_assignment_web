# Authentication System

## Description
The project is designed to implement an authentication system.  
Authentication is implemented using JWT, blocking access for unauthorized users.  
When the token becomes invalid, the user is redirected to the login page.  
Additionally, the application supports running in multiple environments.

## Pages

### Login Page
- Validates email format and length.  
- Sends credentials to the server, receives a token, and stores it in the `AuthContext` and `localStorage`.  
- Initiates a periodic token validity check by sending the token to the server.  
- Redirects to the login page if the token has expired.

### Welcome Page
- Displays the saved email from context.  
- Provides a logout button that clears the context and sends a logout request to the server.

## Components
- **Button** and **Input**: reusable UI elements extracted into separate components.

## Data Storage
- **AuthContext** holds user data (email and authentication status).  
- Includes a method for periodic server checks to verify token validity.  
- Uses **AuthGuard** to wrap all protected pages and enforce access control.

## Services
Handle logic related to server communication and token management.

## Explanations & Trade-offs

### 1. Secrets and Security
- Uses the `REACT_APP_CHECK_TOKEN_TIMEOUT_SEC` variable to set the JWT validity check interval.  
- No token refresh mechanism is implemented.

### 2. Error Handling
- Errors are caught in context and on pages for simplicity.  
- No error banner or toast notifications are shown (e.g., in the bottom-right corner).

### 3. Tokens
- Once a JWT expires, the user must log in again.  
- In production, a refresh token should be used to automatically renew the session.

### 4. Testing
No automated tests are included in this codebase.  