import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import { CleaningServicesNavigator } from './cleaningServices.navigator'
import { SettingsNavigator } from './settings.navigator'
import { MapScreen } from '../../features/map/screens/map.screen'

import { CleaningServicesContextProvider } from '../../services/cleaningServices/cleaningServices.context'
import { LocationContextProvider } from '../../services/location/location.context'
import { FavouritesContextProvider } from '../../services/favourites/favourites.context'

const Tab = createBottomTabNavigator()

const TAB_ICON = {
  CleaningServices: 'home',
  Map: 'md-map',
  Settings: 'md-settings',
}

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name]
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  }
}

export const AppNavigator = () => (
  <FavouritesContextProvider>
    <LocationContextProvider>
      <CleaningServicesContextProvider>
        <Tab.Navigator
          screenOptions={createScreenOptions}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen
            name='CleaningServices'
            component={CleaningServicesNavigator}
          />
          <Tab.Screen name='Map' component={MapScreen} />
          <Tab.Screen name='Settings' component={SettingsNavigator} />
        </Tab.Navigator>
      </CleaningServicesContextProvider>
    </LocationContextProvider>
  </FavouritesContextProvider>
)