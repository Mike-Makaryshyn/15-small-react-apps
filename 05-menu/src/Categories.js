import React from 'react';

const Categories = ({ filterItems,catagories }) => {

   return (
      <div className="btn-container">
         {catagories.map(category =>
            <button
               className="filter-btn"
               onClick={() => filterItems(category)
               }
               key={category}
            >
               {category}
            </button>
         )}

      </div>
   )
};

export default Categories;
