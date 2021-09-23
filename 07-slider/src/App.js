import React,{ useState,useEffect } from 'react';


import data from './data';
import PersonSlide from './PersonSlide';


function App() {
   const [people,setPeople] = useState(data);
   const [index,setIndex] = useState(0);

   useEffect(() => {
      const lastIndex = people.length - 1;
      if (index < 0) {
         setIndex(lastIndex)
      }
      if (index > lastIndex) {
         setIndex(0)
      }
   },[index,people])

   useEffect(() => {
      let slider = setInterval(() => {
         setIndex(index + 1)
      },3000)
      return () => clearInterval(slider);
   },[index])

   const prev = () => {
      setIndex(index - 1)
   }

   const next = () => {
      setIndex(index + 1)
   }


   return (
      <section className="section">
         <div className="title">
            <h2>
               <span>/</span>reviews
            </h2>
         </div>
         <div className="section-center">
            {people.map((person,personIndex) =>
               <PersonSlide
                  key={person.id}
                  people={people}
                  person={person}
                  personIndex={personIndex}
                  index={index}
                  next={next}
                  prev={prev}
               />
            )}
         </div>
      </section>
   );
}

export default App;
