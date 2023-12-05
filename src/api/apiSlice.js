import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
    reducerPath: "api", //название reducer
    baseQuery:  fetchBaseQuery({baseUrl:"http://localhost:3001"}),    // funtion what do request (fetchBaseQuery) вместе fetch
    tagTypes: ['Heroes'], // по тегу говорим что это функция будет работать только с этими данными им может быть много(обьвили метки)
    endpoints:  builder =>  ({      //операции по базовуму адресу
            getHeroes: builder.query({
                query: ()=> '/heroes',  // команда creatApi будет автоматически создвать хуки useGetHeroesQuery
                providesTags: ['Heroes'] //к какой метке будут относится данные 
            }),
            createHero : builder.mutation({
                query: hero =>({
                    url: '/heroes',
                    method: 'POST',
                    body: hero  // автоматически преобразовывает в JSON формат
                }),
                invalidatesTags: ['Heroes'] //по какой метке мы должны получить актуальные данные
            }),
            deleteHero : builder.mutation({
                query: id =>({
                    url: `/heroes/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Heroes'] //по какой метке мы должны получить актуальные данные
            })
    })  
})

export const {useGetHeroesQuery, useCreateHeroMutation,useDeleteHeroMutation} = apiSlice;