import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const classesAdapter = createEntityAdapter({})

const initialState = classesAdapter.getInitialState()

export const classesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getClasses: builder.query({
        query: () => '/classes',
        validateStatus: (response, result) => {
            return response.status === 200 && !result.isError
        },
        transformResponse: responseData => {
            const loadedClasses = responseData.map(cls => {// cls: class
              cls.id = cls._id
                return cls
            });
            return classesAdapter.setAll(initialState, loadedClasses)
        },
        providesTags: (result, error, arg) => {
            if (result?.ids) {
                return [
                    { type: 'Class', id: 'LIST' },
                    ...result.ids.map(id => ({ type: 'Class', id }))
                ]
            } else return [{ type: 'Class', id: 'LIST' }]
        }
    }),
    addNewClass: builder.mutation({
      query: initialClassData => ({
        url: '/classes',
        method: 'POST',
        body: {
          ...initialClassData
        }
      }),
      invalidatesTags: [
        { type: 'Class', id: "LIST" }
      ]
    }),
    updateClass: builder.mutation({
      query: initialClassData => ({
        url: '/classes',
        method: 'PATCH',
        body: {
          ...initialClassData
        }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Class', id: arg.id }
      ]
    }),
    deleteClass: builder.mutation({
      query: ({ id }) => ({
        url: '/classes',
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Class', id: arg.id }
      ]
    }),
  }),
})

export const {
  useGetClassesQuery,
  useAddNewClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
} = classesApiSlice

// returns the query result object
export const selectClassesResult = classesApiSlice.endpoints.getClasses.select()

// creates memoized selector
const selectClassesData = createSelector(
  selectClassesResult,
  classesResult => classesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllClasses,
  selectById: selectClassById,
  selectIds: selectClassIds
  // Pass in a selector that returns the classes slice of state
} = classesAdapter.getSelectors(state => selectClassesData(state) ?? initialState)