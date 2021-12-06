import Cart from '../components/Cart/Cart';
import Layout from '../components/Layout/Layout';
import Products from '../components/Shop/Products';
import Head from 'next/head'
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react';
import { uiActions } from "../store/ui-slice"
import Notification from "../components/UI/Notification"

let isInitial = true

function index() {
  const dispatch = useDispatch()

  const showCart = useSelector(state => state.ui.cartIsVisisble)
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notification)


  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'sending..',
        message: 'Sending cart data.'
      }))
      const response = await fetch(process.env.FIREBASE_URL, {
        method: 'PUT',
        body: JSON.stringify(cart)
      })
      if (!response.ok) {
        throw new Error('Send cart data failed.')
      }
      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sent cart data Successfully.'
      }))
    };
    if (isInitial) {
      isInitial = false
      return
    }
    sendCartData().catch(error => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sent cart data failed.'
      }))
    })
  }, [cart, dispatch])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {notification &&
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default index;
