import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../store/store";
import { addItem } from "../../store/cart/cartSlice";
import { toast } from "react-toastify";

interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  type?: string;
}

export const ComponentProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  description,
  price,
}) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id,
        name: title,
        price,
        image,
      })
    );
    toast.success("¡Producto agregado al carrito!");
  };

  return (
    <div className="product-card__container flex flex-col sm:flex-row sm:w-[350px] w-full rounded-md overflow-hidden bg-[var(--color-brown-light)] text-[30px] mb-4 sm:mb-0 md:ml-5 md:mr-5">
      <div className="product-card__image-container w-full sm:w-[40%] h-[150px] sm:h-full">
        <img
          className="product-card__image w-full h-full object-cover"
          src={image}
          alt={title}
        />
      </div>
      <div className="product-card__info-container w-full sm:w-[60%] flex flex-col justify-between pt-3 pb-4 pr-3 pl-[15px]">
        <div className="product-card__info">
          <h1 className="product-card__title text-base font-bold text-[var(--color-brown-darkest)] ">
            {title}
          </h1>
          <p className="product-card__description text-sm text-[var(--color-brown-dark)] ">
            {description}
          </p>
        </div>
        <div className="product-card__bottom-info flex justify-between items-center">
          <p className="product-card__price text-sm font-semibold text-[var(--color-brown-dark)]">
            ${price.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            className="product-card__add-btn w-9 h-9 flex items-center justify-center rounded-full bg-[var(--color-brown-middle)] text-white text-lg cursor-pointer hover:bg-[var(--color-brown-dark)] transition duration-300 ease-in-out"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </div>
  );
};
