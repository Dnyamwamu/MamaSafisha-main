import React, { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AuthenticationContext } from '../authentication/authentication.context'

export const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext)

  const [cart, setCart] = useState([])
  const [cleaningService, setCleaningService] = useState(null)

  const [sum, setSum] = useState(0)

  const saveCart = async (rst, crt, uid) => {
    try {
      const jsonValue = JSON.stringify({ cleaningService: rst, cart: crt })
      await AsyncStorage.setItem(`@cart-${uid}`, jsonValue)
    } catch (e) {
      console.log('error storing', e)
    }
  }

  const loadCart = async (uid) => {
    try {
      const value = await AsyncStorage.getItem(`@cart-${uid}`)
      if (value !== null) {
        const { cleaningService: rst, cart: crt } = JSON.parse(value)
        setCleaningService(rst)
        setCart(crt)
      }
    } catch (e) {
      console.log('error storing', e)
    }
  }

  useEffect(() => {
    if (user && user.uid) {
      loadCart(user.uid)
    }
  }, [user])

  useEffect(() => {
    if (user && user.uid) {
      saveCart(cleaningService, cart, user.uid)
    }
  }, [cleaningService, cart, user])

  useEffect(() => {
    if (!cart.length) {
      setSum(0)
      return
    }
    const newSum = cart.reduce((acc, { price }) => {
      return (acc += price)
    }, 0)
    setSum(newSum)
  }, [cart])

  const add = (item, rst) => {
    if (!cleaningService || cleaningService.placeId !== rst.placeId) {
      setCleaningService(rst)
      setCart([item])
    } else {
      setCart([...cart, item])
    }
  }

  const clear = () => {
    setCart([])
    setCleaningService(null)
  }

  return (
    <CartContext.Provider
      value={{
        addToCart: add,
        clearCart: clear,
        cleaningService,
        cart,
        sum,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
