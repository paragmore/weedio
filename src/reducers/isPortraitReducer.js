const initialState =true
export const isPortraitReducer=( state= initialState, action)=>{

    if (action.type == "isPortrait"){
        return action.payload
    }
    return state;
}