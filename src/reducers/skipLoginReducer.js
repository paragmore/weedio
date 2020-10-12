const initialState =false
export const skipLoginReducer=( state= initialState, action)=>{

    if (action.type == 'skipLogin'){
        return action.payload
    }
    return state;
}