const initialState =true
export const uiHideReducer=( state= initialState, action)=>{

    if (action.type == "uiHide"){
        return action.payload
    }
    return state;
}