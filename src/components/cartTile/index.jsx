import React, { Fragment, useContext } from "react";
import { ShoppingCartContext } from "../../context";

const CartTile = ({ singleCartItem }) => {
  const { handleRemoveFromCart, handleAddToCart } = useContext(ShoppingCartContext);

  return (
    <Fragment>
      <div className="grid grid-cols-3 items-start gap-5">
        <div className="col-span-2 flex items-start gap-4">
          <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-400 p-1 rounded-sm">
            <img
              src={singleCartItem?.thumbnail}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900">
              {singleCartItem?.title}
            </h3>
            <button
              onClick={() => handleRemoveFromCart(singleCartItem, true)}
              className="text-sm px-4 py-3 bg-black text-white font-extrabold float-start rounded"
            >
              Remove
            </button>
          </div>
        </div>
        <div className="ml-auto">
          <h3 className="text-lg font-bold text-gray-900">
            ${singleCartItem?.totalPrice.toFixed(2)}
          </h3>
          <p className="mt-2 mb-3 font-bold text-[16px]">Quantity: {singleCartItem?.quantity}</p>
          <div className="mt-3">
            <button
              onClick={() => handleRemoveFromCart(singleCartItem, false)}
              className="disabled:opacity-75  border border-[#000] rounded text-2xl h-10 w-10"
              disabled = {singleCartItem?.quantity === 1}
            >
              -
            </button>
            <button
              onClick={() => handleAddToCart(singleCartItem)}
              className="border border-[#000] rounded text-2xl ml-2 h-10 w-10"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-400" />
    </Fragment>
  );
};

export default CartTile;
