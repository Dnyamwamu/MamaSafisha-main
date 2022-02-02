import React, { useContext, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { ActivityIndicator, Colors } from 'react-native-paper'

import { FadeInView } from '../../../components/animations/fade.animation'
import { SafeArea } from '../../../components/utility/safe-area.component'
import { Spacer } from '../../../components/spacer/spacer.component'
import { FavouritesBar } from '../../../components/favourites/favourites-bar.component'

import { CleaningServicesContext } from '../../../services/cleaningServices/cleaningServices.context'
import { FavouritesContext } from '../../../services/favourites/favourites.context'

import { Search } from '../components/search.component'
import { CleaningServiceInfoCard } from '../components/cleaningService-info-card.component'

import { CleaningServiceList } from '../components/cleaningService-list.styles'

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`

export const CleaningServicesScreen = ({ navigation }) => {
  const { isLoading, cleaningServices } = useContext(CleaningServicesContext)
  const { favourites } = useContext(FavouritesContext)
  const [isToggled, setIsToggled] = useState(false)

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}

      <CleaningServiceList
        data={cleaningServices}
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
                <FadeInView>
                  <CleaningServiceInfoCard cleaningService={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  )
}
