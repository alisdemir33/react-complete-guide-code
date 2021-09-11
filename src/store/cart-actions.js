import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';


// stash denemesi ....3 . denemeyi yapıp pull yapıcam ama önce stasa atcam
//gene bir seyleri satshdan alıp değiştirdim ve şu an originden farklıyım
export const fetchCartData = () => {
    return async (dispatch) => {

        const fetchData = async () => {

            const response = await fetch('https://react-http-asd-default-rtdb.europe-west1.firebasedatabase.app/cart.json')

            if (!response.ok) {
                throw new Error(' Fetch Cart Failed!')
            }
           
            const data = await response.json();
            return data;
        }

        try {
            const cartData = await fetchData()
            ;debugger
            dispatch(cartActions.replaceCart(
                {
                    items:cartData.items || [], 
                    totalQuantity:cartData.totalQuantity
                })
                    )
        } catch (error) {
            dispatch(uiActions.showNotification({ status: 'error', title: 'Error!!', message: 'Error Ocurred' }));
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({ status: 'PENDING', title: 'sending', message: 'Sending Cart' }));

        const sendRequest = async () => {
            const response = await fetch('https://react-http-asd-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
                {
                    method: 'PUT', //olanın yerine koyar
                    body: JSON.stringify({items:cart.items, totalQuantity:cart.totalQuantity})
                })

            if (!response.ok) {

                throw new Error('Send Failed!')
            }
        }

        try {
            sendRequest(cart);
            dispatch(uiActions.showNotification({ status: 'success', title: 'success', message: 'Cart Sent' }));
        } catch (error) {
            dispatch(uiActions.showNotification({ status: 'error', title: 'Error!!', message: 'Error Ocurred' }));
        }

    }
}
