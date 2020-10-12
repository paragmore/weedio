const initialState =[]
export const reducer=( state= initialState, action)=>{

    if (action.type == 'replace'){
        return action.payload
    }
    else if (action.type == 'add'){
        return [...state].concat(action.payload)
    }
    return state;
}