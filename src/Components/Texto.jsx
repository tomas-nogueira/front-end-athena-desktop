import React from 'react'
import Style from '../Styles/Text.module.css'

function Texto() {
  return (
    <div className={Style.card}>
        <div className={Style.loader}>
            <p>melhore seu</p>
    <div className={Style.words}>
      <span className={Style.word}>desempenho</span>
      <span className={Style.word}>foco</span>
      <span className={Style.word}>objetivo</span>
      <span className={Style.word}>aprendizado</span>
      <span className={Style.word}>ritmo</span>
    </div>
  </div>
</div>
  )
}

export default Texto
