import React,{ useState,useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'

const url = 'https://course-api.com/react-tours-project'

function App() {
   const [loading,setLoading] = useState(true);
   const [tours,setTours] = useState([]);

   const removeTour = (id) => {
      const newTours = tours.filter((tour) => tour.id !== id);
      setTours(newTours);
   }

   const fetcthTours = async () => {
      setLoading(true)
      try {
         const response = await fetch(url);
         const tours = await response.json();
         setLoading(false);
         setTours(tours);
      } catch (error) {
         setLoading(false)
         console.log(error);
      }
   }

   useEffect(() => {
      fetcthTours();
   },[])

   if (loading) {
      return (
         <main>
            <Loading />
         </main>
      );
   }
   if (!tours.length) {
      return (
         <main>
            <div className="title">
               <h2>no tours left</h2>
               <button className="btn" onClick={fetcthTours}>Refresh</button>
            </div>
         </main>
      );
   }
   return (
      <main>
         <Tours removeTour={removeTour} tours={tours} />
      </main>
   );
}

export default App
