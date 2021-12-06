import { createSlice } from "@reduxjs/toolkit"

const uiSlice = createSlice({
    name: 'ui',
    initialState: { cartIsVisisble: true, notification: null },
    reducers: {
        toggle(state) {
            state.cartIsVisisble = !state.cartIsVisisble
        },
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        }
    }
})
export const uiActions = uiSlice.actions

export default uiSlice.reducer