import { useState, KeyboardEvent } from "react";
import { BsSearch } from "react-icons/bs";
import style from "./Search.module.css"

type SreachProps={
    loadUser: (userName: string) => Promise<void>
}

const Search = ({loadUser}: SreachProps) => {
    
    const [userName, setUserName] = useState('')

    const handleKeyDown = (e: KeyboardEvent) => {
        if(e.key === "Enter"){  
            loadUser(userName)
        }
    }

  return (
    <div className={style.Search}>
      <h2>Busque por usuário:</h2>
      <p>Conheça seus melhores repositórios</p>
      <div className={style.Search_Container}>
        <input
          type="text"
          name="Search"
          id="Serach"
          placeholder="Digite o nome do usuário"
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={()=> loadUser(userName)}>
          <BsSearch />
        </button>
      </div>
    </div>
  );
};

export default Search;
