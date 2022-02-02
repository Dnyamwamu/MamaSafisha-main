import React, { useContext, useState, useEffect } from 'react'
import MapView from 'react-native-maps'
import styled from 'styled-components/native'

import { LocationContext } from '../../../services/location/location.context'
import { CleaningServicesContext } from '../../../services/cleaningServices/cleaningServices.context'

import { Search } from '../components/search.component'
import { MapCallout } from '../components/map-callout.component'

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`

export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext)
  const { cleaningServices = [] } = useContext(CleaningServicesContext)

  const [latDelta, setLatDelta] = useState(0)

  const { lat, lng, viewport } = location

  useEffect(() => {
    const northeastLat = viewport.northeast.lat
    const southwestLat = viewport.southwest.lat

    setLatDelta(northeastLat - southwestLat)
  }, [location, viewport])

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {cleaningServices.map((cleaningService) => {
          return (
            <MapView.Marker
              key={cleaningService.name}
              title={cleaningService.name}
              coordinate={{
                latitude: cleaningService.geometry.location.lat,
                longitude: cleaningService.geometry.location.lng,
              }}
            >
              <MapView.Callout
                onPress={() =>
                  navigation.navigate('CleaningServiceDetail', {
                    cleaningService,
                  })
                }
              >
                <MapCallout cleaningService={cleaningService} />
              </MapView.Callout>
            </MapView.Marker>
          )
        })}
      </Map>
    </>
  )
}
