const initialState ={}
export const userInfoReducer=( state= initialState, action)=>{

    if (action.type == "userInfo"){
        return action.payload
    }
    return state;
}