import { useContext } from "react"
import { CartFABContext } from "../context/CartFABContext"


export function useCartFAB() {
    const context = useContext(CartFABContext)
    if (context === undefined) {
        throw new Error("useCartFAB must be used within a CartFABProvider")
    }
    return context
}
