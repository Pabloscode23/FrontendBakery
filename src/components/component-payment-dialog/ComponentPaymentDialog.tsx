import React, { useState } from "react";
import { z } from "zod";
import validator from "validator";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { toast } from "react-toastify";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { clearCart } from "../../store/cart/cartSlice";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const schema = z.object({
    cardNumber: z.string().refine((val) => validator.isCreditCard(val), {
        message: "Número de tarjeta inválido",
    }),
    expiry: z
        .string()
        .regex(/^([0-1][0-9])\/([0-9]{2})$/, {
            message: "Formato inválido (MM/AA)",
        })
        .refine((val) => {
            const [month, year] = val.split("/");
            const m = parseInt(month, 10);
            const y = parseInt(year, 10);
            const now = new Date();
            const currentMonth = now.getMonth() + 1;
            const currentYear = now.getFullYear() % 100;
            return y > currentYear || (y === currentYear && m >= currentMonth);
        }, {
            message: "Fecha expirada",
        }),
    cvc: z.string().regex(/^\d{3}$/, {
        message: "Debe contener 3 dígitos numéricos",
    }),
    location: z.array(z.number()).length(2, {
        message: "Ubicación requerida",
    }),
});

interface Props {
    onClose: () => void;
}

const LocationMarker = ({ setLocation }: { setLocation: (pos: [number, number]) => void }) => {
    useMapEvents({
        click(e) {
            setLocation([e.latlng.lat, e.latlng.lng]);
        },
    });
    return null;
};

const uniqueID = `order-${Date.now()}`;

const ComponentPaymentDialog: React.FC<Props> = ({ onClose }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [location, setLocation] = useState<[number, number] | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { total, items } = useAppSelector((state) => state.cart);
    const { user_id } = useCheckAuth();
    const dispatch = useAppDispatch();

    const validateField = (field: keyof typeof schema.shape, value: any) => {
        const result = schema.shape[field].safeParse(value);
        setErrors((prev) => ({
            ...prev,
            [field]: result.success ? "" : result.error.errors[0].message,
        }));
    };

    const handlePay = async () => {
        const result = schema.safeParse({
            cardNumber,
            expiry,
            cvc,
            location: location ? [...location] : [],
        });

        if (!result.success) {
            const newErrors: Record<string, string> = {};
            result.error.errors.forEach((err) => {
                newErrors[err.path[0] as string] = err.message;
            });
            setErrors(newErrors);
            toast.error("Corrige los campos marcados");
            return;
        }

        if (!location) {
            toast.error("Ubicación no encontrada");
            return;
        }

        const [longitude, latitude] = location;

        let address = {
            street: "Calle desconocida",
            city: "Ciudad desconocida",
            state: "Estado desconocido",
            postal_code: "00000",
        };

        try {
            const geocodeResponse = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
                {
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            if (!geocodeResponse.ok) {
                throw new Error("Error al obtener la dirección");
            }

            const geocodeData = await geocodeResponse.json();
            const addressData = geocodeData?.address;

            address = {
                street: addressData?.road || addressData?.pedestrian || "Calle desconocida",
                city: addressData?.city || addressData?.town || addressData?.village || "Ciudad desconocida",
                state: addressData?.state || "Estado desconocido",
                postal_code: addressData?.postcode || "00000",
            };
        } catch (err) {
            console.warn("No se pudo obtener la dirección exacta. Usando valores por defecto.");
        }

        const orderPayload = {
            order_id: uniqueID,
            user_id: user_id,
            address,
            items: items.map((item) => ({
                product_id: item.id,
                quantity: item.quantity,
                price: item.price,
            })),
            total_price: total.toFixed(2),
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: "cors",
                body: JSON.stringify(orderPayload)
            });

            console.log("Status de la respuesta:", response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error del backend:", errorText);
                throw new Error("Error al procesar la orden");
            }

            const data = await response.json();
            toast.success("Pago realizado con éxito");
            console.log("Respuesta de la API:", data);
            onClose();
            dispatch(clearCart());
        } catch (error) {
            console.error("Error:", error);
            toast.error("No se pudo completar la orden");
        }
    };


    return (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-5xl h-screen max-h-[90vh] md:max-h-[60vh] rounded-xl shadow-xl flex flex-col md:flex-row overflow-hidden relative border border-gray-200">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-50 cursor-pointer"
                >
                    <X size={24} />
                </button>

                <div className="w-full md:w-1/2 p-6 flex flex-col justify-between border-r border-gray-200 overflow-y-auto">
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">
                            Total a pagar: ${total.toFixed(2)}
                        </h2>
                        <div className="flex flex-col gap-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Número de tarjeta"
                                    value={cardNumber}
                                    onChange={(e) => {
                                        setCardNumber(e.target.value);
                                        validateField("cardNumber", e.target.value);
                                    }}
                                    className="border p-2 w-full rounded-md"
                                />
                                {errors.cardNumber && (
                                    <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="MM/AA"
                                    value={expiry}
                                    onChange={(e) => {
                                        setExpiry(e.target.value);
                                        validateField("expiry", e.target.value);
                                    }}
                                    className="border p-2 w-full rounded-md"
                                />
                                {errors.expiry && (
                                    <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="CVC"
                                    value={cvc}
                                    onChange={(e) => {
                                        setCvc(e.target.value);
                                        validateField("cvc", e.target.value);
                                    }}
                                    className="border p-2 w-full rounded-md"
                                />
                                {errors.cvc && (
                                    <p className="text-red-500 text-sm mt-1">{errors.cvc}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handlePay}
                        className="cursor-pointer mt-6 bg-[var(--color-brown-middle)] hover:bg-[var(--color-brown-dark)] text-white font-semibold py-2 rounded-md"
                    >
                        Pagar
                    </button>
                </div>

                <div className="w-full max-w-full sm:max-w-[calc(100%-2rem)] h-[90vh] sm:h-full sm:p-6 pt-12 relative mx-4 overflow-x-hidden">
                    <MapContainer
                        center={[9.9281, -84.0907]}
                        zoom={13}
                        scrollWheelZoom={false}
                        className="h-full w-full z-0 rounded-md"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker setLocation={setLocation} />
                        {location && <Marker position={location} />}
                    </MapContainer>

                    {errors.location && (
                        <p className="absolute bottom-2 left-2 text-red-500 text-sm bg-white/80 px-2 py-1 rounded-md">
                            {errors.location}
                        </p>
                    )}
                </div>
            </div>
        </div>

    );
};

export default ComponentPaymentDialog;

