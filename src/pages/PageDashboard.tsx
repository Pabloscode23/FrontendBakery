import React from 'react';
import { ComponentProductCard } from '../components/component-product-card/ComponentProductCard';
import { products } from '../../public/assets/data/products';
import { ComponentCart } from '../components/component-cart/ComponentCart';
import ComponentPaymentDialog from '../components/component-payment-dialog/ComponentPaymentDialog';

export const PageDashboard: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    <h2 className="text-2xl font-bold text-[var(--color-brown-darkest)] mb-6">
                        Nuestros Productos
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {products.map((product) => (
                            <ComponentProductCard
                                key={product.id}
                                image={product.image}
                                title={product.name}
                                description={product.description}
                                price={product.price}
                                type={product.type}
                                id={product.id}
                            />
                        ))}
                    </div>
                </div>

                <div className="lg:w-1/3 lg:sticky lg:top-4 h-fit">
                    <ComponentCart
                        setIsModalOpen={setIsModalOpen}
                    />
                </div>
            </div>
            {isModalOpen && (
                <ComponentPaymentDialog
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};
