const initialState =false
export const endedReducer=( state= initialState, action)=>{

    if (action.type == 'ended'){
        return action.payload
    }
    return state;
}