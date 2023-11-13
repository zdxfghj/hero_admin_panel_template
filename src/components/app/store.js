import { configureStore } from '@reduxjs/toolkit';
import heroes from '../heroesList/heroesSlice'
import filters from '../heroesFilters/filtersSlice';

const store = configureStore({ reducer: {heroes, filters},
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;