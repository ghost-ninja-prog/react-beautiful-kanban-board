import React, { useState } from 'react'

import style from './AddBoard.module.css'

function AddBoard({ addColumn }) {

	const [inputMode, setInputMode] = useState(false)
	const [inputValue, setInputValue] = useState('')

	const handlerSubmit = (e) => {
		e.preventDefault()
		console.log(inputValue)
		addColumn(inputValue)
		setInputValue('')
		setInputMode(false)
	}

	return (
		<div className={style.addColumnContainer}>
			{
				inputMode ? (
					<form onSubmit={handlerSubmit} >
						<input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
						<button type='submit'>add</button>
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