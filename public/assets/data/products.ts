interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  type: string;
}

export const products: Product[] = [
  // ☕ Bebidas Calientes y Frías
  { id: 1, name: "Caramel & Vanilla Frappuccino", description: "Frappuccino con caramelo, vainilla y dulce.", image: "/assets/img/Caramel-Frappucino.jpg", price: 4.5, type: "Bebidas" },
  { id: 2, name: "Golden Latte", description: "Latte especiado con cúrcuma y miel.", image: "/assets/img/Golden-Latte.jpg", price: 3.8, type: "Bebidas" },
  { id: 3, name: "Choco Cinnamon", description: "Delicioso chocolate caliente con un toque de canela.", image: "/assets/img/Choco-Cinnamon.jpg", price: 4.0, type: "Bebidas" },
  { id: 4, name: "Mocaccino", description: "Café con leche y chocolate, cubierto de crema.", image: "/assets/img/Mocacchino.jpg", price: 4.2, type: "Bebidas" },
  { id: 5, name: "Vanilla Latte", description: "Café latte con un toque de vainilla.", image: "/assets/img/Vainilla-Latte.jpg", price: 3.9, type: "Bebidas" },

  // 🍪 Galletas & Macarons
  { id: 6, name: "Vanilla Cookie", description: "Galleta suave con sabor a vainilla.", image: "/assets/img/Vanilla-Cookie.jpg", price: 1.5, type: "Galletas" },
  { id: 7, name: "Snickerdoodle", description: "Galleta clásica con canela y azúcar.", image: "/assets/img/Snickerdoodle.jpg", price: 1.8, type: "Galletas" },
  { id: 8, name: "Raspberry Macaron", description: "Macaron relleno con crema de frambuesa.", image: "/assets/img/Raspberry-Macaron.jpg", price: 2.0, type: "Macarons" },
  { id: 9, name: "Vanilla Macaron", description: "Macaron relleno con crema de vainilla.", image: "/assets/img/Vanilla-Macaron.jpg", price: 2.0, type: "Macarons" },
  { id: 10, name: "Cinnamon Macaron", description: "Macaron relleno con crema de canela.", image: "/assets/img/Cinnamon-Macaron.jpg", price: 2.0, type: "Macarons" },

 // 🎂 Tartas & Queques
  { id: 11, name: "Cheesecake", description: "Tarta de queso clásica.", image: "/assets/img/Cheesecake.jpg", price: 4.5, type: "Tartas" },
  { id: 12, name: "Cinnamon Apple Cake", description: "Bizcocho de manzana con canela.", image: "/assets/img/Cinnamon-Apple-Cake.webp", price: 4.0, type: "Tartas" },
  { id: 13, name: "Cinnamon Coffee Cake", description: "Tarta de café con un toque de canela.", image: "/assets/img/Cinnamon-Coffee-Cake.jpg", price: 4.0, type: "Tartas" },
  { id: 14, name: "Strawberry Vanilla Cake", description: "Tarta de vainilla con fresas frescas.", image: "/assets/img/Strawberry-Cake.jpg", price: 5.0, type: "Tartas" },
  { id: 15, name: "Vanilla Cake Piece", description: "Porción de pastel de vainilla.", image: "/assets/img/Vanilla-Cake.webp", price: 3.5, type: "Tartas" },
  { id: 16, name: "Entire Vanilla Cake", description: "Pastel de vainilla completo.", image: "/assets/img/Entire-Vanilla-Cake.jpg", price: 20.0, type: "Tartas" },

  // 🥮 Rollos & Especialidades
  { id: 17, name: "Cinnamon Roll Choco", description: "Rollo de canela con chocolate.", image: "/assets/img/CinnamonRoll-Choco.jpg", price: 3.5, type: "Rollos" },
  { id: 18, name: "Cinnamon Rolls with Cream", description: "Rollos de canela con crema.", image: "/assets/img/Creamy-Cinnamon.jpg", price: 3.8, type: "Rollos" },
  { id: 19, name: "Pecabon", description: "Rollo de canela con nuez pecana y glaseado.", image: "/assets/img/Pecabon.jpg", price: 4.2, type: "Rollos" },

  // 🧇 Waffles & Delicias Horneadas
  { id: 20, name: "Cinnamon Sugar Palmiers", description: "Palmiers azucarados con canela.", image: "/assets/img/Cinnamon-Sugarpalmiers.jpg", price: 2.5, type: "Horneadas" },
  { id: 21, name: "Croissant", description: "Croissant clásico de mantequilla.", image: "/assets/img/Croissant.jpg", price: 2.8, type: "Horneadas" },
  { id: 22, name: "Cinnamon Waffles", description: "Waffles con un toque de canela.", image: "/assets/img/Cinnamon-Waffles.jpg", price: 3.5, type: "Horneadas" },
  { id: 23, name: "Vanilla Waffles", description: "Waffles sabor vainilla.", image: "/assets/img/Vanilla-Waffles.jpg", price: 3.5, type: "Horneadas" },
  { id: 24, name: "Giant Pretzel", description: "Pretzel gigante horneado.", image: "/assets/img/Giant-Pretzels.jpg", price: 3.0, type: "Horneadas" }
];
