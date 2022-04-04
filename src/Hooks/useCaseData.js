import { useContext } from 'react'
import CaseDataContext from "../Context/CaseDataContext"

const useCaseData = () => {
  return useContext(CaseDataContext);
}

export default useCaseData