import React from 'react'
import { useGlobalContext } from './context'


import Navbar from './Navbar'
import CartContainer from './CartContainer'
import Loader from './Loader'


function App() {
   const { loading } = useGlobalContext();

   if (loading) {
      return (
         <Loader />
      )
   }
   return (
      <main>
         <Navbar />
         <CartContainer />
      </main>
   )
}

export default App
