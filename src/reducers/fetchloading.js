const initialState =false
export const fetchLoadingReducer=( state= initialState, action)=>{

    if (action.type == 'loading'){
        return action.payload
    }
    return state;
}