import React,{ useState } from 'react';
import { FaMinus,FaPlus } from 'react-icons/fa';
const Question = ({ question,clicked }) => {
   const { title,info } = question;
   const [isInfoShown,setInfoShown] = useState(false)
   return (
      <article className="question">
         <header className="header">
            <h4>{title}</h4>
            <button
               className="btn"
               onClick={() => setInfoShown(!isInfoShown)}
            >
               {isInfoShown
                  ?
                  <FaMinus />
                  :
                  <FaPlus />
               }
            </button>
         </header>
         {isInfoShown &&
            <p>{info}</p>
         }

      </article>
   )
};

export default Question;
