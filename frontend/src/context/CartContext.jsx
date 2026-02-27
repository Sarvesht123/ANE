import { createContext, useContext, useMemo } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TO_CART, CREATE_EMPTY_CART } from '../graphql/operations';

const CART_ID_KEY = 'guestCartId';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [createEmptyCart] = useMutation(CREATE_EMPTY_CART);
  const [addProductsToCart] = useMutation(ADD_TO_CART);

  const ensureCart = async () => {
    let cartId = window.localStorage.getItem(CART_ID_KEY);

    if (!cartId) {
      const { data } = await createEmptyCart();
      cartId = data?.createEmptyCart;
      if (cartId) {
        window.localStorage.setItem(CART_ID_KEY, cartId);
      }
    }

    return cartId;
  };

  const addToCart = async (sku, quantity = 1) => {
    const cartId = await ensureCart();
    if (!cartId) {
      throw new Error('Unable to create cart.');
    }

    await addProductsToCart({
      variables: {
        cartId,
        sku,
        qty: quantity,
      },
    });

    return cartId;
  };

  const value = useMemo(
    () => ({
      addToCart,
      getCartId: () => window.localStorage.getItem(CART_ID_KEY),
      clearCartId: () => window.localStorage.removeItem(CART_ID_KEY),
    }),
    []
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider.');
  }
  return context;
}
