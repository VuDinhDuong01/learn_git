import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface userType {
    id: string,
    userid: string,
    username: string,
    password: string
}

export const authApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/v1/' }),
    endpoints: (build) => ({
        login: build.mutation<{ message: string, data: userType }, { password: string, username: string }>({
            query: (body) => ({
                url: `login`,
                method: 'POST',
                body,
            }),
        }),
    })
})
export const { useLoginMutation } = authApi