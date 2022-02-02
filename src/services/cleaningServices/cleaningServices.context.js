import React, { useState, useContext, createContext, useEffect } from 'react'

import {
  cleaningServicesRequest,
  cleaningServicesTransform,
} from './cleaningServices.service'

import { LocationContext } from '../location/location.context'

export const CleaningServicesContext = createContext()

export const CleaningServicesContextProvider = ({ children }) => {
  const [cleaningServices, setCleaningServices] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { location } = useContext(LocationContext)

  const retrieveCleaningServices = (loc) => {
    setIsLoading(true)
    setCleaningServices([])

    setTimeout(() => {
      cleaningServicesRequest(loc)
        .then(cleaningServicesTransform)
        .then((results) => {
          setIsLoading(false)
          setCleaningServices(results)
        })
        .catch((err) => {
          setIsLoading(false)
          setError(err)
        })
    }, 2000)
  }
  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`
      retrieveCleaningServices(locationString)
    }
  }, [location])

  return (
    <CleaningServicesContext.Provider
      value={{
        cleaningServices,
        isLoading,
        error,
      }}
    >
      {children}
    </CleaningServicesContext.Provider>
  )
}
