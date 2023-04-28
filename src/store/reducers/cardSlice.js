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
            
        }
        
    }
})


export const { addCard, removeCard } = cardSlice.actions
export const cardReducer = cardSlice.reducer