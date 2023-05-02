import { createSlice } from "@reduxjs/toolkit"



const initialState = [
    {
      name: 'Задачи',
      items: [
        {id: '1', content: 'First Task'},
        {id: '2', content: 'Second Task'},
      ]
    },
    {
      name: 'В работе',
      items: []
    }
]

const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        addCard: (state, action) => {
            const { boardIndex, content } = action.payload

            return state = state.map((column, index) => {
                if(index === boardIndex) {
                    return {...column, items: [...column.items, {id: Date.now().toString(), content}]}
                }
                return column
            })
        },
        removeCard: (state, action) => {
            const {id, boardIndex} = action.payload
            return state = state.map((column, index) => {
                if(index === boardIndex) {
                    return {...column, items: column.items.filter(item => item.id !== id)}
                }
                return column
            })
            
        },
        addColumn: (state, action) => {
            const newColumn = {
                name: action.payload,
                items: []
            }
            return state = [...state, newColumn]
        },
        onDragEnd: (state, action) => {
            if (!action.payload.destination) return;
            const { source, destination } = action.payload;
          
            if (source.droppableId !== destination.droppableId) {
                const sourceColumn = state[source.droppableId];
                const destColumn = state[destination.droppableId];
                const sourceItems = [...sourceColumn.items];
                const destItems = [...destColumn.items];
                const [removed] = sourceItems.splice(source.index, 1);
                destItems.splice(destination.index, 0, removed);
          
                state = state.map((column, index) => {
                    if(index === Number(source.droppableId)) {
                        column.items = sourceItems
                        return column
                    } else if (index === Number(destination.droppableId)) {
                        column.items = destItems
                        return column
                    }
                    return column
                })
            } else {
                const column = state[source.droppableId];
                const copiedItems = [...column.items];
                const [removed] = copiedItems.splice(source.index, 1);
                copiedItems.splice(destination.index, 0, removed);
                state = state.map((column, index) => {
                    if(index === Number(source.droppableId)) {
                        column.items = copiedItems
                        return column
                    }
                    return column
                })
            }
        }
        
    }
})


export const { addCard, removeCard, addColumn, onDragEnd } = cardSlice.actions
export const cardReducer = cardSlice.reducer