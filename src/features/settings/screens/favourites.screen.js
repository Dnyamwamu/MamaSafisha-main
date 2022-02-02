import React, { useContext } from 'react'
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'

import { FavouritesContext } from '../../../services/favourites/favourites.context'

import { SafeArea } from '../../../components/utility/safe-area.component'
import { Text } from '../../../components/typography/text.component'
import { Spacer } from '../../../components/spacer/spacer.component'

import { CleaningServiceList } from '../../cleaningServices/components/cleaningService-list.styles'
import { CleaningServiceInfoCard } from '../../cleaningServices/components/cleaningService-info-card.component'

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`
export const FavouritesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext)

  return favourites.length ? (
    <SafeArea>
      <CleaningServiceList
        data={favourites}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CleaningServiceDetail', {
                  cleaningService: item,
                })
              }
            >
              <Spacer position='bottom' size='large'>
                <CleaningServiceInfoCard cleaningService={item} />
              </Spacer>
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  ) : (
    <NoFavouritesArea>
      <Text center>No favourites yet</Text>
    </NoFavouritesArea>
  )
}
