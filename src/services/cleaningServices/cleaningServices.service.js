import { mocks, mockImages } from './mock'
import camelize from 'camelize'

export const cleaningServicesRequest = (location) => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location]
    if (!mock) {
      reject('not found')
    }
    resolve(mock)
  })
}

export const cleaningServicesTransform = ({ results = [] }) => {
  const mappedResults = results.map((cleaningService) => {
    cleaningService.photos = cleaningService.photos.map((p) => {
      return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))]
    })

    return {
      ...cleaningService,
      address: cleaningService.vicinity,
      isOpenNow:
        cleaningService.opening_hours && cleaningService.opening_hours.open_now,
      isClosedTemporarily:
        cleaningService.business_status === 'CLOSED_TEMPORARILY',
    }
  })

  return camelize(mappedResults)
}
