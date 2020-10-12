
const initialState =null
export const prevPageReducer=( state= initialState, action)=>{

    if (action.type == 'prevPage'){
        return action.payload
    }
    return state;
}