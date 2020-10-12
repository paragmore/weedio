const initialState = 'litprod-env.eba-c4wegi8b.us-west-2.elasticbeanstalk.com'
export const domainReducer=( state= initialState, action)=>{

    if (action.type == 'domain'){
        return action.payload
    }
    return state;
}