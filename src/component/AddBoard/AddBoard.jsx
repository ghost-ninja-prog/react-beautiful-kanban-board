import React, { useState } from 'react'

import style from './AddBoard.module.css'

function AddBoard() {

    const [inputMode, setInputMode] = useState(false)

  return (
    <div className={style.addColumnContainer}>
        {
            inputMode ? (
                <form>
                    <input type="text" />
                    <button>add</button>
                </form>
            ) : (
                <div 
                    className={style.addColumnTitle}
                    onClick={() => setInputMode(true)}
                >
                    <span className={style.addColumnIcon}></span>
                    <span>Добавить колонку</span>
                </div>
            )
        }
    </div>
  )
}

export default AddBoard