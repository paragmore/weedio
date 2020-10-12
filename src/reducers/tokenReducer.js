const initialState = null
export const tokenReducer=( state= initialState, action)=>{

    if (action.type == 'token'){
        return action.payload
    }
    return state;
}