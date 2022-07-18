import { useContext } from 'react'
import DataContext from '../Context/DataContext';


//Custom hooks to use context data globally
const useAuth = () => {
  return useContext(DataContext);
}

export default useAuth