import { createContext, useReducer, ReactNode } from "react";

type Action = { type: "toggleIsOpen" };

interface State {
  isOpen: boolean;
}

interface CartFABContextType {
  isOpen: boolean;
  toggleIsOpen: () => void;
}

// Reducer
function cartFABReducer(state: State, action: Action): State {
  switch (action.type) {
    case "toggleIsOpen":
      return { ...state, isOpen: !state.isOpen };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Context
const CartFABContext = createContext<CartFABContextType | undefined>(undefined);

// Provider
function CartFABProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartFABReducer, { isOpen: false });

  const toggleIsOpen = () => {
    dispatch({ type: "toggleIsOpen" });
  };

  const value = {
    isOpen: state.isOpen,
    toggleIsOpen,
  };

  return (
    <CartFABContext.Provider value={value}>{children}</CartFABContext.Provider>
  );
}

export { CartFABProvider, CartFABContext };
