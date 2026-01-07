import React, { useEffect, useState } from "react";
import NavBar from "../../components/Users/NavBar";
import CartProduct from "../../components/Users/CartProduct";

const Cart = () => {
  const id = localStorage.getItem("user");
  const [data, setData] = useState([]);
  const [qty, setQty] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!id) {
      console.log("No id");
    }
  }, []);

  useEffect(() => {
    async function viewCart() {
      try {
        const req = await fetch(
          `${import.meta.env.VITE_localhost}/user/viewCart?userId=${id}`,
          {
            method: "GET",
          }
        );

        const res = await req.json();
        if (req.ok) {
          setQty(res.qty);
          setData(res.items);

          const calculatedTotal = res.items.reduce((acc, elem, index) => {
            const itemQty = res.qty[index]?.quantity || 0;
            const itemPrice = elem.productPrice || 0;
            return acc + itemQty * itemPrice;
          }, 0);

          setTotal(calculatedTotal);
        } else {
          console.log(err);
        }
      } catch (error) {
        console.log("Error at viewCart Frontend: ", error);
      }
    }

    viewCart();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 pb-32">
      <NavBar
        Contact={"Contact"}
        Products={"Products"}
        Messages={"Messages"}
        Signup={"Categories"}
        Id={id}
        Shop1={"/shop"}
      />

      <div className="max-w-4xl mx-auto px-4 mt-10">
        <h1 className="text-3xl font-serif font-bold text-stone-800 mb-8">
          Your Shopping Bag
        </h1>

        {data.length > 0 ? (
          data.map((elem, index) => (
            <CartProduct
              name={elem.productName}
              price={elem.productPrice}
              productId={elem._id}
              quantity={elem.productQuantity}
              key={elem._id}
              src={elem.productImage}
              qty={qty[index]?.quantity || 0}
            />
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300">
            <p className="text-stone-500 font-serif italic">
              Your cart is feeling a bit light...
            </p>
          </div>
        )}
      </div>

      {/* FIXED BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 w-full p-4 z-50">
        <div className="max-w-4xl mx-auto bg-stone-900 text-white p-5 rounded-2xl shadow-2xl flex justify-between items-center border border-white/10 backdrop-blur-lg">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400">
              Estimated Total
            </p>
            <p className="text-2xl font-black">Rs. {total.toLocaleString()}</p>
          </div>
          <button className="bg-red-800 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest transition-all">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
