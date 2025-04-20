import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../store/store";
import { useCartFAB } from "../../hooks/useCartFAB";

export const CartFAB = () => {
  const { items } = useAppSelector((state) => state.cart);
  const hasItems = items.length > 0;
  const { isOpen, toggleIsOpen } = useCartFAB();

  const handleToggle = () => {
    toggleIsOpen();
  };

  const calculateTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const quantity = calculateTotalItems();

  return !isOpen ? (
    <button
      onClick={handleToggle}
      className="lg:hidden fixed flex flex-row justify-center gap-3 bottom-4 bg-[var(--color-brown-dark)] text-white rounded-4xl p-3 md:p-5 shadow-lg hover:bg-[var(--color-brown-darkest)] transition duration-300 ease-in-out"
    >
      {hasItems && (
        <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-5 h-5 md:h-7 md:w-7 flex items-center justify-center text-xs">
          {quantity}
        </span>
      )}
      <FontAwesomeIcon icon={faCartShopping} />
    </button>
  ) : (
    <div
      className="lg:hidden fixed block w-screen h-screen top-0 left-0 bg-black opacity-50 z-10"
      onClick={handleToggle}
    ></div>
  );
};
