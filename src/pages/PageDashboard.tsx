import React from 'react';
import { ComponentProductCard } from '../components/component-product-card/ComponentProductCard';
import { products } from '../assets/data/products';
import { ComponentCart } from '../components/component-cart/ComponentCart';


export const PageDashboard: React.FC = () => {
    return (
        <div>

            <div className='dashboard__container flex mt-7'>
                <div className='products__container w-[60%] flex flex-wrap justify-center gap-5'>
                    {
                        products.map((product) => (
                            <ComponentProductCard
                                key={product.id}
                                image={product.image}
                                title={product.name}
                                description={product.description}
                                price={product.price}
                                type={product.type}
                            />
                        ))
                    }
                </div>

                <ComponentCart />
            </div>
        </div>
    );
}
