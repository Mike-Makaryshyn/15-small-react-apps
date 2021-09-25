import React,{ useState,useContext } from 'react'
import sublinks from './data';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
   const [isSidebarOpen,setIsSidebarOpen] = useState(false);
   const [isSubmenuOpen,setIsSubmenuOpen] = useState(false);
   const [location,setLocation] = useState({});
   const [page,setPage] = useState({ page: '',links: [] });

   const openSidebar = () => {
      setIsSidebarOpen(true);
      document.body.style.overflow = "hidden";
   }
   const closeSidebar = () => {
      setIsSidebarOpen(false);
   }
   const openSubmenu = (text,coodinates) => {
      const page = sublinks.find((link) => link.page === text)
      setPage(page);
      setLocation(coodinates);
      setIsSubmenuOpen(true);
   }
   const closeSubmenu = () => {
      setIsSubmenuOpen(false);
   }

   return <AppContext.Provider value={{
      isSubmenuOpen,
      isSidebarOpen,
      openSubmenu,
      openSidebar,
      closeSubmenu,
      closeSidebar,
      location,
      page,
   }}>{children}</AppContext.Provider>
}

//custom hook
export const useGlobalContext = () => {
   return useContext(AppContext);
}

export { AppContext,AppProvider }
