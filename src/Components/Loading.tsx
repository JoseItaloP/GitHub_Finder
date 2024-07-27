import style from './Loading.module.css'

const Loading = () => {
  return (
    <div className={style.BackAnimation}>
      <div className={style.AnimationRotate}></div>
    </div>
  )
}

export default Loading
