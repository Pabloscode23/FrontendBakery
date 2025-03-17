import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useCheckAuth } from "../../hooks/useCheckAuth";

export const ComponentNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useCheckAuth();
  const { logout } = useCheckAuth();

  return (
    <nav className="bg-[#8a4a35] p-2">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex w-full md:w-auto items-center justify-between">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white ml-4 cursor-pointer md:hidden"
          >
            <Menu size={28} />
          </button>
          <Link to="/" className="text-white text-2xl font-bold">
            <img
              src="src/assets/img/Logo.png"
              alt="Logo"
              className="w-90 h-auto mx-auto md:ml-2 md:pr-4"
            />
          </Link>
        </div>

        {/* Men� */}
        <div
          className={`md:flex md:space-x-8 text-lg w-full md:w-auto bg-[#8a4a35] transition-all duration-300 ${
            isOpen
              ? "mt-5 flex flex-col items-center md:flex-row md:mt-0"
              : "hidden md:flex"
          }`}
        >
          {["Ordenar", "Perfil"].map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              className="block md:inline-block text-white py-2 px-4 relative group"
            >
              {item}
              <span className="absolute left-1/2 bottom-0 h-1 bg-white w-0 transition-all duration-300 group-hover:w-1/3 transform -translate-x-1/2"></span>
            </a>
          ))}
          {!isAuthenticated ? (
            [
              { to: "/register", label: "Registrarse" },
              { to: "/login", label: "Iniciar Sesión" },
            ].map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="block md:inline-block text-white py-2 px-4 relative group"
              >
                {link.label}
                <span className="absolute left-1/2 bottom-0 h-1 bg-white w-0 transition-all duration-300 group-hover:w-1/3 transform -translate-x-1/2"></span>
              </Link>
            ))
          ) : (
            <Link
              onClick={() => logout("Sesión cerrada")}
              to="/"
              className="block md:inline-block text-white py-2 px-4 relative group"
            >
              Cerrar Sesión
              <span className="absolute left-1/2 bottom-0 h-1 bg-white w-0 transition-all duration-300 group-hover:w-1/3 transform -translate-x-1/2"></span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
