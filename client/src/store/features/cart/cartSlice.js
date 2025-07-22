import { createSlice } from "@reduxjs/toolkit";

const calculateTotal = (cartItems) => {
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return { totalQuantity, totalPrice };
};

// Load cart from localStorage if available
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const initialState = {
  cartItems: loadCartFromStorage(),
  totalQuantity: 0,
  totalPrice: 0,
};

// Calculate totals on initial load
const initialTotals = calculateTotal(initialState.cartItems);
initialState.totalQuantity = initialTotals.totalQuantity;
initialState.totalPrice = initialTotals.totalPrice;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((i) => i._id === item._id);
      if (existItem) {
        existItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: item.quantity || 1 });
      }
      // Update totals and save to localStorage
      const { totalQuantity, totalPrice } = calculateTotal(state.cartItems);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload);
      if (item) {
        item.quantity += 1;
        const { totalQuantity, totalPrice } = calculateTotal(state.cartItems);
        state.totalQuantity = totalQuantity;
        state.totalPrice = totalPrice;
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item) {
        state.cartItems = state.cartItems.filter((i) => i._id !== item._id);
      }
      // Update totals and save to localStorage
      const { totalQuantity, totalPrice } = calculateTotal(state.cartItems);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      // Update totals and save to localStorage
      const { totalQuantity, totalPrice } = calculateTotal(state.cartItems);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cart");
    },
  },
});
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

{
  /*
  // Helper function to calculate total quantity and price
const calculateTotals = (cartItems) => {
  console.log(cartItems)
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  return { totalQuantity, totalPrice };
};

// Load cart from localStorage if available
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
};

// Initial state
const initialState = {
  cartItems: loadCartFromStorage(),
  totalQuantity: 0,
  totalPrice: 0,
};

// Calculate totals on initial load
const initialTotals = calculateTotals(initialState.cartItems);
initialState.totalQuantity = initialTotals.totalQuantity;
initialState.totalPrice = initialTotals.totalPrice;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cartItems.push({ ...item, quantity: item.quantity || 1 });
      }

      // Update totals and save to localStorage
      const { totalQuantity, totalPrice } = calculateTotals(state.cartItems);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);

      if (item) {
        item.quantity += 1;
        const { totalQuantity, totalPrice } = calculateTotals(state.cartItems);
        state.totalQuantity = totalQuantity;
        state.totalPrice = totalPrice;
        localStorage.setItem('cart', JSON.stringify(state.cartItems));
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item) {
        state.cartItems = state.cartItems.filter((i) => i.id !== item.id);
      }

      // Update totals and save to localStorage
      const { totalQuantity, totalPrice } = calculateTotals(state.cartItems);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);

      // Update totals and save to localStorage
      const { totalQuantity, totalPrice } = calculateTotals(state.cartItems);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.removeItem('cart');
    }
  }
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;



  */
}

{
  /*
// cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const calculateTotals = (cartItems) => {
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  return { totalQuantity, totalPrice };
};

const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
};

const initialState = {
  cartItems: loadCartFromStorage(),
  totalQuantity: 0,
  totalPrice: 0,
};

const initialTotals = calculateTotals(initialState.cartItems);
initialState.totalQuantity = initialTotals.totalQuantity;
initialState.totalPrice = initialTotals.totalPrice;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);

      if (existingItem) {
        // If the item already exists, increment its quantity
        existingItem.quantity += newItem.quantity;
      } else {
        // If it's a new item, add it to the cart with an initial quantity of 1
        state.cartItems.push({ ...newItem, quantity: newItem.quantity || 1 });
      }

      // Update totals and save to localStorage
      const { totalQuantity, totalPrice } = calculateTotals(state.cartItems);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);

      if (item) {
        item.quantity += 1;
        const { totalQuantity, totalPrice } = calculateTotals(state.cartItems);
        state.totalQuantity = totalQuantity;
        state.totalPrice = totalPrice;
        localStorage.setItem('cart', JSON.stringify(state.cartItems));
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item) {
        state.cartItems = state.cartItems.filter((i) => i.id !== item.id);
      }

      const { totalQuantity, totalPrice } = calculateTotals(state.cartItems);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);

      const { totalQuantity, totalPrice } = calculateTotals(state.cartItems);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.removeItem('cart');
    }
  }
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

  */
}
