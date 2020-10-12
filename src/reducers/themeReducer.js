const initialState =false
export const themeReducer=( state= initialState, action)=>{

    if (action.type == "changeTheme"){
        return action.payload
    }
    return state;
}