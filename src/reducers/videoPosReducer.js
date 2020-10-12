const initialState ={videoId:null,pos:{start:null, end:null}}
const merge= (prev, next)=> Object.assign({}, prev, next)
export const videoPosReducer=( state= initialState, action)=>{

    if (action.type == 'videoPos'){
        return action.payload
    }
    return state;
}