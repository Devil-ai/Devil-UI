export default ((state, action)=>{
    switch(action.origin){
        case "GRID":
            switch(action.type){
                case "CURRSTATE":
                    return {
                        ...state,
                        status: action.status,  
                    }
                case "GRIDUSERINPUT":
                    return {
                        ...state,
                        GRIDUSERINPUT: action.GRIDUSERINPUT,  
                    }
                default:
                    return state;       
            }
        case "CHAT":
            return state;
        default:
            return state;
    }
})