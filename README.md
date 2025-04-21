# Frontend Bakery

A modern e-commerce application for bakery products built with React, TypeScript, and Vite. This project was developed as part of the "Diseño y Construcción de Componentes" course at UCENFOTEC.

## Course Information
- **Course**: Diseño y Construcción de Componentes
- **Term**: C1-2025
- **Institution**: UCENFOTEC
- **Professor**: Mario Miguel Aguero Obando
- **Students**:
  - Isabella María Nassar Miguez
  - José Pablo Navarro Rodríguez
  - Santiago Zeledón Marin

## Features

### Authentication System
- Secure user authentication with email/password
- User registration with automatic login
- Protected routes for authenticated users
- Session management with cookies
- User-friendly error messages in Spanish

### Shopping Cart
- Add/remove products
- Update quantities
- Cart total calculation
- Persistent cart state with Redux
- Responsive cart interface
- Toast notifications for cart actions

## Technical Stack

### Frontend
- **Frontend Library**: React with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux
- **Form Handling**: react-hook-form
- **Styling**: Tailwind CSS
- **Notifications**: react-toastify

### Backend with AWS (Serverless Architecture)
- **API Gateway**: Exposes secure RESTful endpoints for frontend communication.
- **AWS Lambda (Python)**: Stateless backend functions handle business logic, including user management, product operations, and order processing.
- **DynamoDB**: NoSQL database used for storing user data, products, and orders.
- **CloudWatch**: Monitoring and logging for all Lambda functions and API Gateway activity.
- **AWS Amplify**: Hosting and continuous deployment for the frontend application.

> The backend is built using a serverless approach to ensure high scalability and low maintenance.

## Getting Started

### Prerequisites
- Node.js (latest LTS version)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
