import React from 'react'

import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'

import { CleaningServicesScreen } from '../../features/cleaningServices/screens/cleaningServices.screen'
import { CleaningServiceDetailScreen } from '../../features/cleaningServices/screens/cleaningService-detail.screen'

const CleaningServiceStack = createStackNavigator()

export const CleaningServicesNavigator = () => {
  return (
    <CleaningServiceStack.Navigator
      headerMode='none'
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <CleaningServiceStack.Screen
        name='CleaningServices'
        component={CleaningServicesScreen}
      />
      <CleaningServiceStack.Screen
        name='CleaningServiceDetail'
        component={CleaningServiceDetailScreen}
      />
    </CleaningServiceStack.Navigator>
  )
}
