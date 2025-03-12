import React from 'react';
import TrashIcon from '/src/assets/img/Trash.png';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { removeItem, updateQuantity, clearCart } from '../../store/cart/cartSlice';
import { toast } from 'react-toastify';

export const ComponentCart: React.FC = () => {
    const { items, total } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    const handleDecrement = (id: number) => {
        const item = items.find(item => item.id === id);
        if (item && item.quantity > 1) {
            dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(id));
            toast.info('Producto eliminado del carrito');
        }
    };

    const handleIncrement = (id: number) => {
        const item = items.find(item => item.id === id);
        if (item) {
            dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
        }
    };

    const handleRemoveItem = (id: number) => {
        dispatch(removeItem(id));
        toast.info('Producto eliminado del carrito');
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        toast.info('Carrito vaciado');
    };

    if (items.length === 0) {
        return (
            <div className="cart__container flex flex-col w-[300px] h-[400px] rounded-lg p-6 bg-white shadow-lg sticky top-4 mr-5">
                <h2 className="text-xl font-semibold mb-4">Tu carrito</h2>
                <p className="text-gray-500 text-center">Tu carrito está vacío</p>
            </div>
        );
    }

    return (
        <div className="cart__container flex flex-col w-[300px] h-[400px] rounded-lg p-6 bg-white shadow-lg sticky top-4 mr-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Tu carrito</h2>
                <button
                    onClick={handleClearCart}
                    className="text-sm text-red-500 hover:text-red-700 hover:cursor-pointer transition-colors"
                >
                    Vaciar
                </button>
            </div>
            <div className="flex-1 overflow-y-auto">
                {items.map((item) => (
                    <div key={item.id} className="flex flex-col mb-4 pb-4 border-b">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                <div className="ml-3">
                                    <h3 className="font-medium text-sm">{item.name}</h3>
                                    <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <img src={TrashIcon} alt="Eliminar" className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => handleDecrement(item.id)}
                                    className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition"
                                >
                                    -
                                </button>
                                <span className="text-gray-800">{item.quantity}</span>
                                <button
                                    onClick={() => handleIncrement(item.id)}
                                    className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition"
                                >
                                    +
                                </button>
                            </div>
                            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <button className="mt-4 w-full py-2 bg-[var(--color-brown-middle)] hover:bg-[var(--color-brown-dark)] text-white rounded-lg transition-colors">
                    Proceder al Pago
                </button>
            </div>
        </div>
    );
};
