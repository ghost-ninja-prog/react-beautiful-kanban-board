import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import style from './Card.module.css'


function Card({ item, index, removeTask }) {
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
            onClick={() => removeTask(item.id)}
            className={style.btnRemove}
          />
        </div>
      )}
    </Draggable>
  )
}

export default Card