import React,{ useState } from 'react';
import Menu from './Menu';
import Categories from './Categories';
import items from './data';

const allCategories = ['all',...new Set(items.map(item => item.category))];

function App() {
   const [menuItems,setMenuItems] = useState(items);
   const [catagories,setCatagories] = useState(allCategories);

   const filterItems = (category) => {
      if (category === 'all') {
         setMenuItems(items);
         return;
      }
      const newItems = items.filter((item) => item.category === category);
      setMenuItems(newItems);
   }

   return (
      <main>
         <section className="menu section">
            <div className="title">
               <h2>our menu</h2>
               <div className="underline"></div>
            </div>
            <Categories catagories={catagories} filterItems={filterItems} />
            <Menu items={menuItems} />
         </section>
      </main>
   )
}

export default App;
