import { Address } from "cluster";
import { OrderItem } from "./OrderItem";

export interface Order {
    order_id: string;
    user_id: string;
    created_at: string;
    total_price: string;
    items: OrderItem[];
    address: Address;
}