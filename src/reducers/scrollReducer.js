const initialState =true
export const scrollReducer=( state= initialState, action)=>{

    if (action.type == "scroll"){
        return action.payload
    }
    return state;
}