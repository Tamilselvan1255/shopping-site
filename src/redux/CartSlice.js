import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
        const product = action.payload;

        const existingProduct = state.items.find(item => item.product_id === product.product_id);
        if(existingProduct){
            existingProduct.quantity += 1
        } else {
            state.items.push({...product, quantity: 1})
        }
    },
   removeCart: (state, action) => {
    state.items = state.items.filter((item) => item.product_id !== action.payload)
   },
   updateQuantity: (state, action) => {
    const {product_id, quantity} = action.payload;
    const existingProduct = state.items.find((item) => item.product_id === product_id);
    if(existingProduct && quantity > 0){
        existingProduct.quantity = quantity;
    }
   }
  },
});

export const { addToCart, removeCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
