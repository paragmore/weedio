const initialState = null
export const dimensionsReducer=( state= initialState, action)=>{

    if (action.type == 'dimensions'){
        return action.payload
    }
    return state;
}