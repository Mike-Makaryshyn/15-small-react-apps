import React,{ useState,useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
   let list = localStorage.getItem('list');
   if (list) {
      return JSON.parse(list)
   } else {
      return []
   }
}

function App() {
   const [name,setName] = useState('');
   const [list,setList] = useState(getLocalStorage());
   const [isEditing,setIsEditing] = useState(false);
   const [editID,setEditID] = useState(null);
   const [alert,setAlert] = useState({
      show: false,
      msg: '',
      type: ''
   });


   const handleSubmut = (e) => {
      e.preventDefault();
      if (!name) {
         showAlert(true,'danger','please enter value');
      } else if (name && isEditing) {
         setList(
            list.map((item) => {
               if (item.id === editID) {
                  return { ...item,title: name }
               }
               return item
            })
         )
         setName('');
         setEditID(null);
         setIsEditing(false);
         showAlert(true,'success','value has been changed')
      } else {
         showAlert(true,'success','item has been added to the list')
         const newItem = { id: new Date().getTime().toString(),title: name };
         setList([...list,newItem]);
         setName('');
      }
   }

   const showAlert = (show = false,type = '',msg = '') => {
      setAlert({ ...alert,show,type,msg })
   }
   const clearList = () => {
      showAlert(true,'danger','empty list');
      setList([]);
   }
   const removeItem = (id) => {
      showAlert(true,'danger','item has been removed');
      const newItems = list.filter(item => item.id !== id)
      setList(newItems);
   }

   const editItem = (id) => {
      const specificItem = list.find((item) => item.id === id);
      setIsEditing(true);
      setEditID(id);
      setName(specificItem.title)
   }

   useEffect(() => {
      localStorage.setItem('list',JSON.stringify(list))
   },[list])

   return (
      <section className="section-center">
         <form className="grocery-form" onSubmit={handleSubmut}>
            {alert.show &&
               <Alert
                  {...alert}
                  removeAlert={showAlert}
                  list={list}
               />}
            <h3>grocery bud</h3>
            <div className="form-control">
               <input
                  className="grocery"
                  placeholdet="e. g eggs"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
               />
               <button className="submit-btn" type="submit" >
                  {isEditing ? 'edit' : 'submit'}
               </button>
            </div>
         </form>
         {list.length > 0 &&
            <div className="grocery-container">
               <List items={list} removeItem={removeItem} editItem={editItem} />
               <button className="clear-btn" onClick={clearList}>
                  clear items
               </button>
            </div>
         }
      </section>
   )
}

export default App
