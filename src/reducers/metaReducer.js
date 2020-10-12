const initialState = {}
export const metaReducer=( state= initialState, action)=>{

    if (action.type == 'meta'){
        return action.payload
    }
    return state;
}