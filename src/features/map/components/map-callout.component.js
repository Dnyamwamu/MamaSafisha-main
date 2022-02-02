import React from 'react'

import { CompactCleaningServiceInfo } from '../../../components/cleaningService/compact-cleaningService-info.component'

export const MapCallout = ({ cleaningService }) => (
  <CompactCleaningServiceInfo isMap cleaningService={cleaningService} />
)
