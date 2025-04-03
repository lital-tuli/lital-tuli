
# ReactClient_Blog

A versatile React blog client template built with Vite, Redux Toolkit, and Bootstrap. This project provides a robust frontend application for various types of blogs, featuring global state management with Redux Toolkit, API integration with Axios, and form handling via Formik and Yup. It is designed to work seamlessly with a Django backend (see [DjangoServer_Blog](https://github.com/GuyHasan/DjangoServer_Blog) for the backend implementation) and offers features like persistent authentication, dynamic article caching, and more.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Installation & Setup](#installation--setup)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Backend Integration](#backend-integration)
- [State Management & Redux](#state-management--redux)
- [API Integration](#api-integration)
- [Library Roles & Dependencies](#library-roles--dependencies)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**ReactClient_Blog** is a modern, highly configurable React frontend template for blog applications. It is built with Vite for a fast development experience, Redux Toolkit for state management, and Bootstrap for responsive UI design. This client template is designed to be versatile so that it can be adapted for various blog types. It integrates seamlessly with a Django backend (see our [DjangoServer_Blog](https://github.com/GuyHasan/DjangoServer_Blog) repository for details) and offers features like persistent authentication, dynamic article caching, and more.

---

## Features

- **Versatile Blog Client:**  
  A template that can be adapted for different blog types.
  
- **Global State Management:**  
  Uses Redux Toolkit to manage global state for articles, comments, and user authentication, reducing unnecessary API re-fetches.
  
- **User Authentication:**  
  Integrates with JWT-based authentication. The refresh token is stored in session storage to persist authentication state across page refreshes.
  
- **API Integration:**  
  Uses Axios for API calls, with separate service modules for articles, comments, and authentication.
  
- **Form Handling & Validation:**  
  Uses Formik and Yup for building and validating forms.
  
- **Responsive UI:**  
  Built with React and Bootstrap, ensuring a modern and responsive interface.
  
- **Routing:**  
  Uses React Router DOM for client-side routing between pages.

---

## Technologies Used

- **React** – For building the user interface.
- **Vite** – Fast build tool and development server.
- **Redux Toolkit** – Simplifies Redux state management.
- **React Redux** – Connects React with Redux.
- **Axios** – For making API requests.
- **Bootstrap** – For responsive UI components.
- **Formik** – For form state management.
- **Yup** – For form validation.
- **React Router DOM** – For client-side routing.
- **ESLint** – For code quality and linting.

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/GuyHasan/ReactClient_Blog.git
cd ReactClient_Blog
```

### 2. Install Dependencies

Make sure you have Node.js (v14 or later) installed, then run:

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory with the following content:

```dotenv
VITE_API_URL=http://127.0.0.1:8000/api
```

This variable will be used to configure API requests in the frontend. Access it in your code via:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

### 4. Run the Development Server

```bash
npm run dev
```

Your app should now be available at [http://localhost:5173](http://localhost:5173).

---

## Usage

### Versatile Blog Template

This client template is designed to be adaptable for different blog types:
- **Article Listing:**  
  The home page displays a list of articles, which are cached in Redux so that data is not re-fetched unnecessarily.
  
- **Comments:**  
  Comments for articles are fetched and displayed, including support for nested (replying) comments.
  
- **User Authentication:**  
  Users can log in via a form; the refresh token is stored in session storage, and the Redux auth state determines if a user is logged in. The JWT payload includes a `user_group` field for role-based permissions.
  
- **Routing:**  
  Client-side routing is handled by React Router DOM, enabling smooth navigation between pages.

---

## Backend Integration

This React client is designed to work seamlessly with the [DjangoServer_Blog](https://github.com/GuyHasan/DjangoServer_Blog) backend. Configure the API URL in your `.env` file:

```dotenv
VITE_API_URL=http://127.0.0.1:8000/api
```

The backend handles articles, comments, and authentication (including JWT token refresh). Refer to the DjangoServer_Blog README for full backend setup and API route details.

---

## State Management & Redux

### Redux Store

- **Configuration:**  
  The Redux store is configured in `src/redux/store.js` and combines slices for articles, comments, and authentication.

### Slices

- **Articles Slice:**  
  Defined in `src/redux/features/articles/articlesSlice.js`, it manages article data (fetching, pagination, adding new articles) using async thunks.
  
- **Comments Slice:**  
  Defined in `src/redux/features/comments/commentsSlice.js`, it manages comments data for articles, including nested replies.
  
- **Auth Slice:**  
  Defined in `src/redux/features/auth/authSlice.js`, it handles user authentication. It stores tokens and user roles and checks session storage for a refresh token to persist login across refreshes.

### Dispatch & Selectors

- **useDispatch:**  
  Used in components to dispatch actions (e.g., fetching articles or logging in).
  
- **useSelector:**  
  Used in components to access state data (e.g., articles, comments, auth state).

---

## API Integration

### API Services

- **Article Service:**  
  Located in `src/services/articleService.js`, this module handles API calls for articles (GET, POST, etc.).
  
- **Comment Service:**  
  Located in `src/services/commentService.js`, this module handles API calls for comments.
  
- **Auth Service:**  
  Located in `src/services/authService.js`, this module handles authentication-related API calls (login, token refresh).

### Async Thunks

Async actions are created with Redux Toolkit's `createAsyncThunk` to handle the complete lifecycle of API calls:

- **Pending:** The request is in progress.
- **Fulfilled:** The request succeeds; the state is updated with new data.
- **Rejected:** The request fails; the state is updated with error information.

For example, in the articles slice, you have async thunks like:
- `fetchArticles`
- `fetchArticlesByPage`
- `addNewArticle`

Similarly, the comments slice and auth slice have their respective async thunks.

---

## Library Roles & Dependencies

### Key Dependencies

- **@reduxjs/toolkit:**  
  Provides tools for creating slices, async thunks, and configuring the Redux store with minimal boilerplate.
  
- **axios:**  
  Handles API requests and responses.
  
- **bootstrap:**  
  Supplies responsive UI components.
  
- **formik & yup:**  
  Help manage form state and validation.
  
- **react & react-dom:**  
  Core libraries for building and rendering the user interface.
  
- **react-icons:**  
  Provides a rich set of icons to enhance the UI.
  
- **react-redux:**  
  Connects React components to the Redux store.
  
- **react-router-dom:**  
  Manages client-side routing between pages.
  
- **ESLint:**  
  Ensures code quality and consistency.

---

## Development

### Running the App

**Frontend (React/Vite):**

```bash
npm run dev
```

**Building for Production:**

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```

---

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/my-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature/my-feature
   ```
5. Open a pull request.

Please adhere to the project's coding guidelines and ensure tests pass before submitting your changes.

---

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

