const initialState = null
export const currentChannelReducer=( state= initialState, action)=>{

    if (action.type == 'currentChannel'){
        return action.payload
    }
    return state;
}