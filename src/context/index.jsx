import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);

const ShoppingCartProvider = ({ children }) => {
  const [listOfProducts, setListOfProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  async function fetchingProducts() {
    const apiRes = await fetch("https://dummyjson.com/products");
    const result = await apiRes.json();

    if (result && result?.products) {
      setListOfProducts(result?.products);
      setLoading(false);
    }
  }

  function handleAddToCart(getProductDetails) {
    console.log(getProductDetails);
    let copyCartItem = [...cartItems]; // Correct variable name
    let productIndex = copyCartItem.findIndex(
      (item) => item.id === getProductDetails.id
    );
    
    if (productIndex === -1) {
      copyCartItem.push({
        ...getProductDetails,
        quantity: 1,
        totalPrice: getProductDetails?.price,
      });
    } else {
      console.log("It's logging ");
      copyCartItem[productIndex] = {
        ...copyCartItem[productIndex],
        quantity: copyCartItem[productIndex].quantity + 1,
        totalPrice:
          (copyCartItem[productIndex].quantity + 1) *
          copyCartItem[productIndex].price,
      };
    }
  
    setCartItems(copyCartItem);
    localStorage.setItem("cartItems", JSON.stringify(copyCartItem));
    navigate("/cart");
  }
  
  useEffect(() => {
    fetchingProducts();
    setCartItems(JSON.parse(localStorage.getItem('cartItems') || []))
  }, []);
  console.log(cartItems);


  function handleRemoveFromCart(getProductDetails, isFullyRemoved) {
    let copyExistingCartItems = [...cartItems];
    const indexOfCurrentCartItem = copyExistingCartItems.findIndex(item => item?.id === getProductDetails?.id);

    if(isFullyRemoved)
      copyExistingCartItems.splice(indexOfCurrentCartItem,1);
    else
    {
      copyExistingCartItems[indexOfCurrentCartItem] = {
        ...copyExistingCartItems[indexOfCurrentCartItem],
        quantity: copyExistingCartItems[indexOfCurrentCartItem].quantity - 1,
        totalPrice: (copyExistingCartItems[indexOfCurrentCartItem].quantity - 1) *
         copyExistingCartItems[indexOfCurrentCartItem].price,
      }
    }
    localStorage.setItem('cartItems',JSON.stringify(copyExistingCartItems));
    setCartItems(copyExistingCartItems);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        listOfProducts,
        loading,
        setLoading,
        productDetails,
        setProductDetails,
        handleAddToCart,
        cartItems,
        handleRemoveFromCart
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
