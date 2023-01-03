const initialState = { isConnected: false};

function ConnectionReducer(state = initialState, action) {
    if(action.type === "CONNECTION_CHANGED"){
        return {...state, isConnected: action.isConnected};
    }else{
        return state
    }
}

export default ConnectionReducer;