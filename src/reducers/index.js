const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: "all"
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_DELETED':
                const newHeroesList = state.heroes.filter(item => item.id !== action.payload)
                return {
                    ...state,
                    heroes: newHeroesList,
            }
        case 'HEROES_ADD':
                const addHeroToList = [...state.heroes, action.payload];
                return {
                    ...state,
                    heroes: addHeroToList,
            }
        case 'FILTERS_FETCHING':
                return {
                    ...state,
                    filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
                return {
                    ...state,
                    filters: action.payload,
                    filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
                return {
                    ...state,
                    filtersLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTERS_CHANGED':
                return {
                    ...state,
                    
            }
        default: return state
    }
}

export default reducer;