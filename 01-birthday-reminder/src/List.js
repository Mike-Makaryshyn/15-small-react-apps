import React from 'react';
import ListItem from './ListItem';

const List = ({ people }) => {
   return (
      <>
         {people.map(person =>
            <ListItem person={person} />
         )}
      </>
   );
};

export default List;
