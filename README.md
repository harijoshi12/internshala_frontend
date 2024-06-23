# Internship Portal Frontend

Welcome to the Internship Portal Frontend! This project is built using React, Vite, TypeScript, and Tailwind CSS. It provides a user-friendly interface for users to browse and apply for internship opportunities. The application includes features such as user authentication, filtering opportunities, and pagination.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components](#components)
- [API Integration](#api-integration)
- [Author](#author)
- [License](#license)

## Features

- **User Authentication**: Secure user registration, login, and logout using JWT (JSON Web Tokens).
- **Opportunities Page**: Browse and apply for internship opportunities.
  - View opportunities as a logged-in or logged-out user.
  - Only logged-in users can apply for opportunities.
  - Redirect to login page if a logged-out user tries to apply.
- **Filtering**: Filter opportunities by status (All Opportunities, Applied Opportunities).
- **Pagination**: Navigate through opportunities with pagination.
- **Responsive Design**: Mobile-friendly and responsive design.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/harijoshi12/internshala_frontend.git
   cd internshala_frontend

   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```

## Usage

- **Register**: Create a new account using the registration page.
- **Login**: Log in with your credentials.
- **Browse** Opportunities: View available internship opportunities.
- **Apply**: Apply for opportunities (only available for logged-in users).
- **Filter**: Use the sidebar to filter opportunities by status.
- **Pagination**: Navigate through opportunities using pagination controls.

## Project Structure

```bash
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Pagination.tsx
│   │   └── TextInput.tsx
│   ├── layout/
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   └── opportunities/
│       ├── OpportunityCard.tsx
│       └── Sidebar.tsx
├── contexts/
│   └── AuthContext.tsx
├── pages/
│   ├── Login.tsx
│   ├── Opportunities.tsx
│   └── Register.tsx
├── services/
│   └── api.ts
├── types/
│   └── index.ts
└── App.tsx
```

## Components

### Common Components

- **Button**: A reusable button component with different variants and sizes.
- **LoadingSpinner**: A loading spinner component with different sizes.
- **Pagination**: A pagination component for navigating through pages.
- **TextInput**: A reusable text input component with labels, error messages, and an optional password visibility toggle.

### Layout Components

- **Header**: The header component with navigation links and user authentication controls.
- **Footer**: The footer component with a copyright notice.

### Opportunities Components

- **OpportunityCard**: A card component to display individual opportunity details.
- **Sidebar**: A sidebar component for filtering opportunities by status.

## API Integration

The frontend interacts with the backend API to perform various operations such as user authentication and fetching opportunities. The API integration is handled in the `api.ts` file.

### Auth Endpoints

- **login**: Authenticates a user with the provided credentials.
- **register**: Registers a new user with the provided credentials.

### Opportunity Endpoints

- **getOpportunities**: Fetches opportunities with pagination and an optional applied filter.
- **applyForOpportunity**: Applies for an opportunity with the given ID.

## Author

- Hari Joshi

## License

This project is licensed under the MIT License.

This README file provides a comprehensive overview of the project, including its features, installation instructions, usage guidelines, project structure, components, API integration, and author information.
