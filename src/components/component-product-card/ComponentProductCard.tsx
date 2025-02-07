import React from 'react'

interface ProductCardProps {
    image: string;
    title: string;
    description: string;
    price: number;
    type?: string;
}

export const ComponentProductCard: React.FC<ProductCardProps> = ({ image, title, description, price }) => {
    return (
        <div className='product-card__container flex flex-row h-[150px] w-[350px] rounded-md overflow-hidden bg-[var(--color-brown-light)] text-[30px]'>

            <div className='product-card__image-container w-[40%] h-full'>
                <img className='product-card__image w-full h-full object-cover' src={image} alt={title} />
            </div>

            <div className='product-card__info-container w-[60%] flex flex-col justify-between pt-3 pb-4 pr-2 pl-[15px]'>

                <div className='product-card__info'>
                    <h1 className='product-card__title text-base font-bold text-[var(--color-brown-darkest)] '>{title}</h1>
                    <p className='product-card__description text-sm text-[var(--color-brown-dark)] '>{description}</p>
                </div>


                <div className='product-card__bottom-info flex justify-between items-center'>
                    <p className='product-card__price text-sm font-semibold text-[var(--color-brown-dark)]'>${price.toFixed(2)}</p>
                    <button className='product-card__add-btn w-9 h-9 flex items-center justify-center rounded-full bg-[var(--color-brown-middle)] text-white text-lg cursor-pointer hover:bg-[var(--color-brown-dark)] transition duration-300 ease-in-out'>
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

