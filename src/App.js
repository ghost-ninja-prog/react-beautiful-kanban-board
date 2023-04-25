import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';
import Board from './component/Board/Board';

const itemsFromBackend = [
  {id: '1', content: 'First Task'},
  {id: '2', content: 'Second Task'},
]

const columnsFromBackend = {
  '1': {
    name: 'Задачи',
    items: itemsFromBackend
  },
  '2': {
    name: 'В работе',
    items: []
  }
}

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};





function App() {

  const [columns, setColumns] = useState(columnsFromBackend)

  const AddTaskFromState = (boardId, taskName) => {
    const newTask = {
      id: Date.now().toString(),
      content: taskName
    }
    const column = columns[boardId]
    setColumns({...columns,
      [boardId]: {
        ...column,
        items: [...column.items, newTask]
      }
    })
  }

  return (
    <div className='app-container'>
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([id, column]) => {
          return (
            <Board key={id} id={id} column={column} AddTaskFromState={AddTaskFromState} />
            // <div
            //   style={{
            //     display: 'flex',
            //     flexDirection: 'column',
            //     alignItems: 'center'
            //   }}
            //   key={id}
            // >
            //   <h2>{column.name}</h2>
            //   <Droppable droppableId={id} key={id}>
            //   {(provided, snapshot) => {
            //     return (
            //       <div
            //         {...provided.droppableProps}
            //         ref={provided.innerRef}
            //         style={{
            //           background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
            //           padding: 4,
            //           width: 250,
            //           minHeight: 500
            //         }}
            //       >
            //         {column.items.map((item, index) => (
            //             <Draggable key={item.id} draggableId={item.id} index={index}>
            //               {(provided, snapshot) => (
            //                   <div
            //                     ref={provided.innerRef}
            //                     {...provided.draggableProps}
            //                     {...provided.dragHandleProps}
            //                     style={{
            //                       userSelect: 'none',
            //                       padding: 16,
            //                       margin: '0 0 8px 0',
            //                       minHeight: '50px',
            //                       backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
            //                       color: 'white',
            //                       ...provided.draggableProps.style
            //                     }}
            //                   >
            //                     {item.content}
            //                   </div>
            //               )}
            //             </Draggable>
            //         ))}
            //       {provided.placeholder}
            //       </div>
            //     )
            //   }}
              
            // </Droppable>
            // </div>            
          )
        })}
      </DragDropContext>
    </div>
  )
}


export default App;
