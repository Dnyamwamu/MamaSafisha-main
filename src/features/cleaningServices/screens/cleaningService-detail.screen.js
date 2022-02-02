import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { List, Divider } from 'react-native-paper'

import { Spacer } from '../../../components/spacer/spacer.component'
import { CleaningServiceInfoCard } from '../components/cleaningService-info-card.component'

import { SafeArea } from '../../../components/utility/safe-area.component'
import { OrderButton } from '../components/cleaningService-list.styles'

export const CleaningServiceDetailScreen = ({ route }) => {
  const [indoorExpanded, setIndoorExpanded] = useState(false)
  const [outdoorExpanded, setOutdoorExpanded] = useState(false)
  const [heavyLiftingExpanded, setHeavyLiftingExpanded] = useState(false)
  const [contactExpanded, setContactExpanded] = useState(false)

  const { cleaningService } = route.params
  return (
    <SafeArea>
      <CleaningServiceInfoCard cleaningService={cleaningService} />
      <ScrollView>
        <List.Accordion
          title='Indoor Services'
          left={(props) => <List.Icon {...props} icon='washing-machine' />}
          expanded={indoorExpanded}
          onPress={() => setIndoorExpanded(!indoorExpanded)}
        >
          <List.Item title='Laundry / Ironing         (Ksh. 500/=)' />
          <List.Item title='Walls / Windows         (Ksh. 500/=)' />
          <List.Item title='Cabinets                       (Ksh. 500/=)' />
          <List.Item title='Fridge/Oven                 (Ksh. 500/=)' />
        </List.Accordion>
        <Divider />
        <List.Accordion
          title='Outdoor Services'
          left={(props) => <List.Icon {...props} icon='spray-bottle' />}
          expanded={outdoorExpanded}
          onPress={() => setOutdoorExpanded(!outdoorExpanded)}
        >
          <List.Item title='Gardening                     (Ksh. 1000/=)' />
          <List.Item title='Car Wash                      (Ksh. 500/=)' />
          <List.Item title='Wall / Windows            (Ksh. 500/=)' />
          <List.Item title='General Cleaning          (Ksh. 1500/=)' />
        </List.Accordion>
        <Divider />
        <List.Accordion
          title='HeavyLifting Services'
          left={(props) => <List.Icon {...props} icon='forklift' />}
          expanded={heavyLiftingExpanded}
          onPress={() => setHeavyLiftingExpanded(!heavyLiftingExpanded)}
        >
          <List.Item title='Moving                                  (Ksh. 1000/=)' />
          <List.Item title='sorting and Arranging         (Ksh. 1500/=)' />
          <List.Item title='Relocation                             (Ksh. 3500/=)' />
        </List.Accordion>
        <Divider />
        <List.Accordion
          title='Contact Us'
          left={(props) => <List.Icon {...props} icon='card-account-phone' />}
          expanded={contactExpanded}
          onPress={() => setContactExpanded(!contactExpanded)}
        >
          <List.Item title='+254 713 833520' />
          <List.Item title='info@mamasafisha.co.ke' />
          <List.Item title='www.mamasafisha.co.ke' />
          <List.Item title='Facebook - Mamasafisha Cleaning Services' />
          <List.Item title='HQ Offices - Kasarani' />
        </List.Accordion>
      </ScrollView>
      <Spacer position='bottom' size='large'>
        <OrderButton
          icon='phone'
          mode='contained'
          // onPress={() => {
          //   addToCart({ item: "special", price: 1299 }, restaurant);
          //   navigation.navigate("Checkout");
          // }}
        >
          ENQUIRE (+254 713 833520)
        </OrderButton>
      </Spacer>
    </SafeArea>
  )
}
