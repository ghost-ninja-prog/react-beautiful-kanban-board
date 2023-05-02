import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import Board from './component/Board/Board';
import AddBoard from './component/AddBoard/AddBoard';

import './App.css';
import { useDispatch } from 'react-redux';
import { onDragEnd } from './store/reducers/cardSlice';
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

//     setColumns(
//       columns.map((column, index) => {
//         if(index === Number(source.droppableId)) {
//           return {...sourceColumn, items: [...sourceItems]}
//         } else if (index === Number(destination.droppableId)) {
//           return {...destColumn, items: [...destItems]}
//         }
//         return column
//       })
//     )
//   } else {
//     const column = columns[source.droppableId];
//     const copiedItems = [...column.items];
//     const [removed] = copiedItems.splice(source.index, 1);
//     copiedItems.splice(destination.index, 0, removed);
//     setColumns(
//       columns.map((column, index) => {
//         if(index === Number(source.droppableId)) {
//           return {...column, items: copiedItems}
//         }
//         return column
//       })
//     );
//   }
// };





function App() {

  const columns = useSelector((state) => state.cards)

  const dispatch = useDispatch()

  return (
    <div className='app-container'>
      <DragDropContext onDragEnd={result => dispatch(onDragEnd(result))} >
        { columns.map((column, index) => {
          return (
            <Board 
              key={index} 
              boardIndex={index} 
              column={column} 
            />            
          )
        })}
        <AddBoard/>
      </DragDropContext>
    </div>
  )
}


export default App;
