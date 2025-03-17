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

### Technical Stack
- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux
- **Form Handling**: react-hook-form
- **Styling**: Tailwind CSS
- **Notifications**: react-toastify

## Getting Started

### Prerequisites
- Node.js (latest LTS version)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Development
Run the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Building for Production
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── store/              # Redux store and slices
├── api/                # API integration
└── styles/             # Global styles
```

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License
This project is licensed under the MIT License.
