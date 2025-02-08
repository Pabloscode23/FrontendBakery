import React, { useState } from 'react';
import TrashIcon from '/src/assets/img/Trash.png';

export const ComponentCart: React.FC = () => {
    // Estado para la cantidad de productos
    const [quantity, setQuantity] = useState(1);

    
    // Se  modifica después cuando los productos se vayan agregandooo
    const productPrice = 10; 

    // Funciones para incrementar y decrementar
    const increment = () => {
        setQuantity(prev => prev + 1);
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    // Función para eliminar el producto del carrito
    const removeItem = () => {
      
        console.log("Producto eliminado");
    };

    // Cálculo del precio total
    const totalPrice = quantity * productPrice;

    return (
        <div className="cart__container flex flex-col w-[300px] h-[400px] rounded-lg p-6 bg-white shadow-lg sticky top-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tu Carrito</h2>
            <div className="flex-1 overflow-auto">
                {/* Aquí irían los productos, solo con botones + y - */}
                <div className="cart-item flex justify-between items-center border-b py-3">
                    <span className="text-sm text-gray-600">Producto</span>
                    <div className="flex items-center space-x-3 cursor:pointer">
                        <button
                            onClick={decrement}
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition cursor-pointer"
                        >
                            -
                        </button>
                        <span className="text-sm text-gray-800">{quantity}</span>
                        <button
                            onClick={increment}
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition cursor-pointer"
                        >
                            +
                        </button>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">${productPrice}</span>

                    {/* Botón de eliminar el producto */}
                    <button
                        onClick={removeItem}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-red-800 rounded-full transition cursor-pointer"
                    >
                        <img src={TrashIcon} alt="Eliminar" className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Cuadro con el precio total */}
            <div className="text-xl mt-4 p-4 border-t text-sm font-semibold text-gray-800">
                <span>Total: </span>
                <span className="text-xl">${totalPrice.toFixed(2)}</span>
            </div>

            <button className="mt-4 py-2 bg-[var(--color-brown-middle)] hover:bg-[var(--color-brown-dark)] text-white font-semibold rounded-md transition duration-200 cursor-pointer">
                Proceder al pago
            </button>
        </div>
    );
};
