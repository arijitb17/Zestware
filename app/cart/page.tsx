"use client";
import { useCart }from "@/context/CartContextprovider"
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link href="/">Go shopping →</Link></p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b py-4">
            <Image src={item.image} alt={item.name} width={100} height={100} />
            <div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p>{item.price}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                  className="px-2 py-1 bg-gray-200"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                  className="px-2 py-1 bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
