import React, { useEffect, useRef, useState } from 'react'

import style from './AddTask.module.css'


function AddTask({ boardId, AddTaskFromState }) {

  const [value, setValue] = useState('')
  const [inputMode, setInputMode] = useState(false)
  const addCardInputRef = useRef(null)

  useEffect(() => {
    addCardInputRef?.current?.focus()
  }, [inputMode])

    function submitHandler(e) {
        e.preventDefault()
        if(value.trim().length === 0) return
        AddTaskFromState(boardId, value)
        setInputMode(false)
        setValue('')
    }

  return (
    <div className={style.addTask}>
      {
        inputMode ? (
          <form 
            className={style.addForm}
            onSubmit={submitHandler}
          >
              <input
                ref={addCardInputRef}
                className={style.addInput}
                type='text'
                placeholder='Please enter Task'
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button
                type='submit'
                className={style.addBtn}
              >
                +
              </button>
          </form>          
        ) : (
          <p
            className={style.addText}
            onClick={() => setInputMode(true)}
          >
            <span
              className={style.addTextPlus}
            >
              +
            </span>
            Добавить карточку
          </p>
        )

      }
    </div>
  )
}

export default AddTask