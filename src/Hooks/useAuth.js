import { useContext } from 'react'
import DataContext from '../Context/DataContext';

const useAuth = () => {
  return useContext(DataContext);
}

export default useAuth