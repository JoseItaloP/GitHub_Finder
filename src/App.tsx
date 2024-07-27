import { Outlet } from "react-router-dom"
import style from './App.module.css'
function App() {
  return (
    <>
    <div className={style.App}>  
        <h1>GitFinder</h1>
        <Outlet />
    </div>
    </>
  )
}

export default App
