import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

const ProductTile = ({ item }) => {
  const navigate = useNavigate();
  const {handleAddToCart, cartItems} = useContext(ShoppingCartContext);

  function handleNavigatingProduct(cuurentProdId) {
    navigate(`/prod-detl/${cuurentProdId}`);
  }

  return (
    <div className="relative group border border-cyan-700 p-6 cursor-pointer">
      <div className="overflow-hidden aspect-w-1 aspect-h-1">
        <img
          src={item?.thumbnail}
          alt={item?.title}
          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
        />
      </div>
      <div className="flex items-start justify-between space-x-4 m-4">
        <div className="font-bold text-gray-800 sm:text-sm text-xs md:text-base">
          <p className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
            {item?.title}
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-800 text-xs sm:text-sm md:text-[16px]">
            ${item?.price}
          </p>
        </div>
      </div>
      <button
        onClick={() => handleNavigatingProduct(item?.id)}
        className="w-full px-5 mt-5 py-2 rounded bg-black text-white font-bold text-lg"
      >
        View Details
      </button>
      <button disabled={cartItems.findIndex(i => i.id === item?.id) > -1}
       onClick={() => handleAddToCart(item)} className=" disabled:opacity-70 w-full px-5 mt-5 py-2 rounded bg-black text-white font-bold text-lg">
        Add To Cart
      </button>
    </div>
  );
};

export default ProductTile;
