export default ((state, action) => {
    switch (action.origin) {
        case "GRID":
            switch (action.type) {
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
            switch (action.type) {
                case "USER":
                    return {
                        ...state,
                        user: action.data,
                    }
                case "SYSTEM":
                    return {
                        ...state,
                        system: action.data,
                    }
                default:
                    return state;
            }
        default:
            return state;
    }
})