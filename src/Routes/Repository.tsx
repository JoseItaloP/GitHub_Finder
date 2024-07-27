import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostProps } from "../Types/post"; //a forma especifica dos elementos
import Post from "../Components/Post";
import Loading from '../Components/Loading'
const Repository = () => {
  type RouteParams = {
    "*": string;
  };
  const User = useParams<RouteParams>()["*"];
  const [filtredPost, setfiltredPost] = useState<PostProps[]>([]);
  const [postData, setPostData] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true) //ativa a animação de loading
    const feth = async (p0: string | void) => {//pega os dados
      const res = await fetch(`https://api.github.com/users/${User}/repos`);
      let data = await res.json();

      setPostData(//bota os dados de especificos de forma especifica
        data.map(
          ({ name, language, html_url, stargazers_count }: PostProps) => ({
            name: name,
            language: language,
            html_url: html_url,
            stargazers_count: stargazers_count,
          })
        )
      );
    };

    feth();
  }, []);

  useEffect(() => {
    //pega os posts novamente
    if (postData.length) {
      const starCounts = postData.map(
        ({ stargazers_count }) => stargazers_count
      );//lê somente as estrelas de cada post
      starCounts.sort((a, b) => b - a); //organiza as estrela, podo as maires na frente

      const uniqueName = new Set<string>(); //Garante que cada projeto seja unico pelo nome
      setfiltredPost(//armazena todos os valores 
        starCounts //estrelas ordenadas
          .slice(0, 5)//pega so as 5 maiores
          .map((starCount) => //procura em cada uma
            postData.find((post) => //procura dentro dos posts armazenados pelo psot com valor estrelas === ao valor organizado atual
              post.stargazers_count === starCount && !uniqueName.has(post.name) && uniqueName.add(post.name) //verifica se os valores sao iguais e unicos
            )
          )
          .filter((post) => post !== undefined ) as PostProps[]//verifica se o filter
      );
      setLoading(false)
    }
    
  }, [postData]);

  if(loading) return <Loading />
  if (filtredPost.length === 0) {
    return(
    <>
      <h1>O usuario {User} não possue nenhum post ainda</h1>
    </>
    );
  } else {
    return (
      <>
        <h1>Veja os projetos mais acessados de: {User}</h1>
        <div className="RepositoryBack transition01">
          {filtredPost &&
            filtredPost.map(
              ({ name, language, html_url, stargazers_count }, index) => (
                <Post
                  key={index}
                  name={name}
                  language={language}
                  html_url={html_url}
                  stargazers_count={stargazers_count}
                />
              )
            )}
        </div>
      </>
    );
  }
};

export default Repository;
