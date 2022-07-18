import { useContext } from 'react'
import CaseDataContext from "../Context/CaseDataContext"


//Custom hooks to use context data globally specific for adding cases
const useCaseData = () => {
  return useContext(CaseDataContext);
}

export default useCaseData