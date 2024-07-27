import { PostProps } from "../Types/post";
import { CiStar } from "react-icons/ci";
import { IoCodeSlashOutline } from "react-icons/io5";

import style from "./Post.module.css";

const Post = ({ name, language, html_url, stargazers_count }: PostProps) => {
  return (
    <div className={`${style.BackPost} CenterAppearAnimation transition01`}>
      <div className={style.fleBoxEdit}>
        <h2>{name}</h2>
        <div className={style.Stars}>
          <CiStar />
          {stargazers_count}
        </div>
        <div className={style.Language}>
          {" "}
          <IoCodeSlashOutline />
          {language? language : "Linguagem nao especificada"}
        </div>
        <a href={html_url} target="_blank">
        <button className={style.Buttn}>
            Ver Projeto
        </button>
          </a>
      </div>
    </div>
  );
};

export default Post;
