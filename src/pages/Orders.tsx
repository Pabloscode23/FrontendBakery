import React, { useEffect, useState } from "react";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

import { X } from "lucide-react";


interface Address {
    street: string;
    city: string;
    state: string;
    postal_code: string;
}

interface OrderItem {
    product_id: number;
    quantity: number;
    price: number;
}

interface Order {
    order_id: string;
    user_id: string;
    total_price: string;
    items: OrderItem[];
    address: Address;
}

export const Orders: React.FC = () => {
    const { user_id, isAuthenticated } = useCheckAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchOrders = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/orders?user_id=${user_id}`
                );
                if (!response.ok) throw new Error("Error fetching orders");

                const data = await response.json();

                if (!Array.isArray(data.orders)) {
                    throw new Error("Invalid data format: orders should be an array");
                }

                setOrders(data.orders);
            } catch (error) {
                toast.error("No se pudieron cargar los pedidos.");
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [isAuthenticated, user_id]);

    const handleDeleteOrder = async (orderId: string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    order_id: orderId,
                    user_id,
                }),
            });

            if (!response.ok) throw new Error("Error al eliminar el pedido");

            setOrders((prev) => prev.filter((order) => order.order_id !== orderId));
            toast.success("Pedido eliminado correctamente");
            setSelectedOrderId(null);
        } catch (error) {
            toast.error("No se pudo eliminar el pedido.");
            console.error("Error deleting order:", error);
        }
    };

    if (!isAuthenticated) {
        return (
            <p className="text-center text-gray-500 mt-10 text-lg">
                Debes iniciar sesión para ver tus pedidos.
            </p>
        );
    }

    if (loading) {
        return <Loader className="bg-[var(--color-brown-dark)]" />;
    }


    return (
        <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg mt-12 mb-12 relative">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Historial de Pedidos
            </h1>

            {orders.length === 0 ? (
                <p className="text-center text-gray-600">
                    No tienes Pedidos registrados.
                </p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order.order_id}
                            className="relative border border-gray-200 rounded-lg p-6 bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <button
                                onClick={() => setSelectedOrderId(order.order_id)}
                                className="absolute top-3 right-3 p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition cursor-pointer"
                                title="Eliminar pedido"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Pedido: {order.order_id}
                                </h2>
                            </div>

                            <div className="mt-6">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-medium text-gray-800">
                                        Productos en esta orden:
                                    </p>
                                    <span className="text-gray-700 text-base">
                                        Total: <strong>${order.total_price}</strong>
                                    </span>
                                </div>
                                <ul className="space-y-3">
                                    {order.items.map((item, index) => (
                                        <li
                                            key={index}
                                            className="bg-gray-100 p-4 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-200"
                                        >
                                            <div className="flex justify-between">
                                                <span className="text-gray-700">
                                                    Producto ID: <strong>{item.product_id}</strong>
                                                </span>
                                                <span className="text-gray-600">
                                                    Cantidad: <strong>{item.quantity}</strong>
                                                </span>
                                            </div>
                                            <div className="mt-2 flex justify-between items-center">
                                                <span className="text-gray-700">
                                                    Precio: $<strong>{item.price}</strong>
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedOrderId && (
                <div className="fixed inset-0 flex items-center justify-center z-50">

                    <div className="absolute inset-0 bg-gray-500 opacity-50"></div>

                    <div className="relative w-[320px] rounded-2xl p-6 bg-white shadow-2xl border border-gray-200 transition-all">
                        <h2 className="text-xl font-semibold mb-3 text-center text-gray-800">
                            Eliminar pedido
                        </h2>
                        <p className="text-gray-600 text-center mb-4">
                            Confirme si desea eliminar el pedido de forma permanente
                        </p>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => handleDeleteOrder(selectedOrderId)}
                                className="bg-[var(--color-brown-dark)] hover:bg-[var(--color-brown-light)] w-full py-2 text-white rounded-lg transition cursor-pointer"
                            >
                                Confirmar
                            </button>
                            <button
                                onClick={() => setSelectedOrderId(null)}
                                className="w-full py-2 bg-[var(--color-brown-middle)] hover:bg-[var(--color-brown-light)] text-white rounded-lg transition-colors cursor-pointer"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
};

export default Orders;
