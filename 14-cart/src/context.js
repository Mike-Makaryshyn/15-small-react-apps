import React,{ useState,useContext,useReducer,useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'

const url = 'https://course-api.com/react-useReducer-cart-project'

const AppContext = React.createContext()

const initialState = {
   loading: false,
   cart: cartItems,
   total: 0,
   amount: 0,
}

const AppProvider = ({ children }) => {
   const [state,dispatch] = useReducer(reducer,initialState);

   const clearCart = () => {
      dispatch({ type: 'CLEAR_CART' })
   }
   const remove = (id) => {
      dispatch({ type: 'REMOVE',payload: id })
   }
   const fetchData = async () => {
      dispatch({ type: 'LOADING' });
      const res = await fetch(url);
      const cart = await res.json();
      dispatch({ type: 'DISPLAY_ITEMS',payload: cart })
   }
   const toggleAmount = (id,type) => {
      dispatch({ type: 'TOGGLE_AMOUNT',payload: { id,type } })
   }
   // instead of toggleAmount first we made 2 similar function => const increase = (id) => {
   //    dispatch({ type: 'INCREASE',payload: id })
   // }
   // const decrease = (id) => {
   //    dispatch({ type: 'DECREASE',payload: id })
   // }

   useEffect(() => {
      fetchData();
   },[])

   useEffect(() => {
      dispatch({ type: 'GET_TOTALS' })
   },[state.cart])

   return (
      <AppContext.Provider
         value={{
            ...state,
            clearCart,
            remove,
            toggleAmount,
            // increase,
            // decrease,
         }}
      >
         {children}
      </AppContext.Provider>
   )
}

export const useGlobalContext = () => {
   return useContext(AppContext)
}

export { AppContext,AppProvider }
