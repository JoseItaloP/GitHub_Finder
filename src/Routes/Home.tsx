import { useState } from "react"
//Components
import Search from "../Components/Search"
import User from "../Components/User"
import Error from "../Components/Error"
import Loading from "../Components/Loading"
//Types
import { UserProps } from "../Types/user"

function Home() {
    const [user, setUser] = useState<UserProps | null>(null)
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false)

    const loadUser = async(userName: string) =>{
        setLoading(true)
        setErr(false)
        setUser(null)
        //search do usuario na API
        const res = await fetch(`https://api.github.com/users/${userName}`)
        const data = await res.json();//os dados

        if(res.status === 404){//verifica se possue erro
          setErr(true)
          return
        }

        const {avatar_url, login, location, followers, following} = data//puxa os dados exatos necessarios

        const userDate: UserProps = {
            avatar_url,
            login,
            location,
            followers,
            following
        }//cria um objeto com os valores necessarios 

        setUser(userDate)//armazena os dados
        setLoading(false)
    }

  return (
    <div>
      <Search loadUser={loadUser}/>
      {
        loading && <Loading/>
      }
      {
        user && <User {...user}/>
      }
      {err && <Error/>}
    </div>
  )
}

export default Home
