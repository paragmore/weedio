
const initialState = null
export const nextPageReducer=( state= initialState, action)=>{

    if (action.type == 'nextPage'){
        return action.payload
    }
    return state;
}