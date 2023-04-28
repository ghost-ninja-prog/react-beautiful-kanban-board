import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import style from './Card.module.css'
import { useDispatch } from 'react-redux'
import { removeCard } from '../../store/reducers/cardSlice'


function Card({ item, index, removeTask, boardIndex }) {

  const dispatch = useDispatch()

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // isDragging={snapshot.isDragging && !snapshot.isDropAnimating}
          className={style.card}
          style={{
            boxShadow: snapshot.isDragging ? '0px 6px 4px 1px rgba(0, 0, 0, .3)' : '0px 3px 4px 1px rgba(0, 0, 0, .3)',
            ...provided.draggableProps.style,
          }}
          
          
        >
          <span>
            {item.content}
          </span>
          <button 
            // onClick={() => removeTask(item.id)}
            onClick={() => dispatch(removeCard({boardIndex, id: item.id}))}
            className={style.btnRemove}
          />
        </div>
      )}
    </Draggable>
  )
}

export default Card