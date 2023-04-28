import React from 'react'
import { Droppable } from 'react-beautiful-dnd'

import Card from '../Card/Card'
import AddTask from '../AddTask/AddTask'

import './Board.css'

function Board({ boardIndex, column, AddTaskFromState, removeTask }) {
    return (
        <div
            className='board'
            key={boardIndex}
        >
            <h2 className='board-title'>{column.name}</h2>
            <Droppable droppableId={boardIndex.toString()} key={boardIndex}>
                {(provided, snapshot) => {
                    return (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className='board-items'
                            // style={{
                            //     background: snapshot.isDraggingOver ? '#c1c1c1' : '#e3e4e6',
                            // }}
                        >
                            {column.items.map((item, index) => (
                                <Card key={item.id} item={item} index={index} boardIndex={boardIndex} removeTask={removeTask} />
                                // <Draggable key={item.id} draggableId={item.id} index={index}>
                                //   {(provided, snapshot) => (
                                //       <div
                                //         ref={provided.innerRef}
                                //         {...provided.draggableProps}
                                //         {...provided.dragHandleProps}
                                //         style={{
                                //           userSelect: 'none',
                                //           padding: 16,
                                //           margin: '0 0 8px 0',
                                //           minHeight: '50px',
                                //           backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                //           color: 'white',
                                //           ...provided.draggableProps.style
                                //         }}
                                //       >
                                //         {item.content}
                                //       </div>
                                //   )}
                                // </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )
                }}

            </Droppable>
            <AddTask boardIndex={boardIndex} AddTaskFromState={AddTaskFromState} />
        </div>
    )
}

export default Board