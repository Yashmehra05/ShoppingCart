import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

const ProductDetails = () => {
  const { id } = useParams();
  const {
    productDetails,
    setProductDetails,
    loading,
    setLoading,
    handleAddToCart,
    cartItems
  } = useContext(ShoppingCartContext);

  async function fetchingProductFromID() {
    const apiRes = await fetch(`https://dummyjson.com/products/${id}`);
    const result = await apiRes.json();

    if (result) {
      setProductDetails(result);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchingProductFromID();
  }, [id]);

  if (loading) return <h1>Wait its Fetching data</h1>;
  console.log(productDetails);

  return (
    <div>
      <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="grid items-center grid-cols-1 lg:grid-cols-5 gap-12 shadow-lg p-6">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="px-4 py-10 rounded-xl shadow-lg relative">
              <img
                className="w-4/5 rounded object-cover"
                src={productDetails?.thumbnail}
                alt={productDetails?.title}
              />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6 max-auto">
              {productDetails?.images?.length
                ? productDetails?.images.map((singleImage) => (
                    <div key={singleImage} className="rounded-xl p-4 shadow-md">
                      <img
                        className="w-24 cursor-pointer"
                        src={singleImage}
                        alt="Product Secondary Image"
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-[#232323]">
              {productDetails?.title}
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <p className="text-xl font-bold">${productDetails?.price}</p>
          </div>
          <div>
            <button
           
            disabled={ 
              productDetails ? 
              cartItems.findIndex(item => item.id === productDetails?.id) > -1
              : false
            }
              onClick={() => {
                handleAddToCart(productDetails);
              }}
              className="disabled:opacity-70 mt-5 min-w-[200px] px-4 py-3 border border-[#232323] bg-transparent rounded
            text-sm font-semibold hover:bg-[#918f8f] shadow-xl"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
