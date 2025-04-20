import React from "react";

const Loader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[var(--color-brown-dark)] border-solid"></div>
            <span className="mt-4 text-gray-600 text-lg">Cargando pedidos...</span>
        </div>
    );
};

export default Loader;
