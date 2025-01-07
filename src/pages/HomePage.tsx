import { useNavigate } from "react-router-dom"
import SearchBar from "../components/SearchBar"

const HomePage = () => {
  const navigate = useNavigate()  
  const onSearch = () => {
    navigate('/search')
  }  
  return (
    <SearchBar onSearch={onSearch} />
  )
}
export default HomePage