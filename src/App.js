import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';
import Board from './component/Board/Board';
import AddBoard from './component/AddBoard/AddBoard';
import { useSelector } from 'react-redux';

const itemsFromBackend = [
  {id: '1', content: 'First Task'},
  {id: '2', content: 'Second Task'},
]

const columnsFromBackend = [
  {
    name: 'Задачи',
    items: itemsFromBackend
  },
  {
    name: 'В работе',
    items: []
  }
]

// const onDragEnd = (result, columns, setColumns) => {
//   if (!result.destination) return;
//   const { source, destination } = result;

//   if (source.droppableId !== destination.droppableId) {
//     const sourceColumn = columns[source.droppableId];
//     const destColumn = columns[destination.droppableId];
//     const sourceItems = [...sourceColumn.items];
//     const destItems = [...destColumn.items];
//     const [removed] = sourceItems.splice(source.index, 1);
//     destItems.splice(destination.index, 0, removed);
//     setColumns({
//       ...columns,
//       [source.droppableId]: {
//         ...sourceColumn,
//         items: sourceItems
//       },
//       [destination.droppableId]: {
//         ...destColumn,
//         items: destItems
//       }
//     });
//   } else {
//     const column = columns[source.droppableId];
//     const copiedItems = [...column.items];
//     const [removed] = copiedItems.splice(source.index, 1);
//     copiedItems.splice(destination.index, 0, removed);
//     setColumns({
//       ...columns,
//       [source.droppableId]: {
//         ...column,
//         items: copiedItems
//       }
//     });
//   }
// };

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

    setColumns(
      columns.map((column, index) => {
        if(index === Number(source.droppableId)) {
          return {...sourceColumn, items: [...sourceItems]}
        } else if (index === Number(destination.droppableId)) {
          return {...destColumn, items: [...destItems]}
        }
        return column
      })
    )
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns(
      columns.map((column, index) => {
        if(index === Number(source.droppableId)) {
          return {...column, items: copiedItems}
        }
        return column
      })
    );
  }
};





function App() {

  // const [columns, setColumns] = useState(columnsFromBackend)
  const columns = useSelector((state) => state.cards)

  // const AddTaskFromState = (boardIndex, taskName) => {
  //   const newTask = {
  //     id: Date.now().toString(),
  //     content: taskName
  //   }
  //   setColumns(columns.map((column, index) => {
  //     if(index === boardIndex) {
  //       return {...column, items: [...column.items, newTask]}
  //     }
  //     return column
  //   }))
  // }

  // const removeTask = (id) => {
  //   const newColumns = columns.map(column => {
  //     return {...column, items: [...column.items.filter(item => item.id !== id)]}
  //   })
  //   setColumns(newColumns)
  // }

  // const addColumn = (columnTitle) => {
  //   const newColumn = {
  //     name: columnTitle,
  //     items: []
  //   }
  //   setColumns([...columns, newColumn])
  // }

  return (
    <div className='app-container'>
      <DragDropContext >
        { columns.map((column, index) => {
          return (
            <Board 
              key={index} 
              boardIndex={index} 
              column={column} 
              // AddTaskFromState={AddTaskFromState} 
              // removeTask={removeTask} 
            />            
          )
        })}
        <AddBoard
          // addColumn={addColumn}
        />
      </DragDropContext>
    </div>
  )
}


export default App;
