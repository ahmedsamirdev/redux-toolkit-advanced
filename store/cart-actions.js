import { uiActions } from "./ui-slice"
import { cartActions } from "./cart-slice"

export const fetchCartData = () => {
    //fetch data when first loads
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://redux-advanced-51d0a-default-rtdb.firebaseio.com/cart.json')
            if (!response.ok) {
                throw new Error("Couldn't fetch cart Data!")
            }
            const data = await response.json()
            return data
        }
        try {
            const cartData = await fetchData()
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }))
        } catch (error) {
            uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sent cart data failed.'
            })
        }
    }
}
// using thunk (action creator)
export const sendCartData = (cart) => {
    return async (dispatch) => {

        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'sending..',
            message: 'Sending cart data.'
        })
        )
        const sendRequest = async () => {
            const response = await fetch(`https://redux-advanced-51d0a-default-rtdb.firebaseio.com/cart.json`, {
                method: 'PUT',
                body: JSON.stringify(cart)
            })
            if (!response.ok) {
                throw new Error('Send cart data failed.')
            }
        }
        try {
            await sendRequest()
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data Successfully.'
            }))
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sent cart data failed.'
            }))
        }
    };
}
