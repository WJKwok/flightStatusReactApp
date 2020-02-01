const initState={
    errorMessage: null,
    data: null
}

const searchReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SEARCH_SUCCESS':
            console.log('Search Success!')
            return {
                ...state,
                data: action.data,
                errorMessage: null
            }
        case 'SEARCH_ERROR':
            console.log('Search Error!')
            return {
                ...state,
                data: null,
                errorMessage: 'Flight Unavailable'
            }
        default:
            return state
    }
}

export default searchReducer;