const initialState =null
export const autoplayReducer=( state= initialState, action)=>{

    if (action.type == 'autoplay'){
        return action.payload
    }
    return state;
}