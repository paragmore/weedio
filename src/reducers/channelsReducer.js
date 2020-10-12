const initialState =[]
export const channelsReducer=( state= initialState, action)=>{

    if (action.type == 'channels'){
        return action.payload
    }
    return state;
}