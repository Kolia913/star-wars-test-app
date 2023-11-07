import {useRoute, RouteProp} from '@react-navigation/native';
import React, {FC, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  useLazyGetFanQuery,
  useLazyGetSpecieQuery,
  useLazyGetWorldQuery,
} from '../features/fans/fansApi';
import {ActivityIndicator, Card, Paragraph} from 'react-native-paper';
import {theme} from '../constants/theme';

type RouteParams = {
  id: string;
};

const DetailsScreen: FC = () => {
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  const [getFan, {isLoading, isError, data: fan}] = useLazyGetFanQuery();
  const [getSpecie, {data: specie}] = useLazyGetSpecieQuery();
  const [getWorld, {data: world}] = useLazyGetWorldQuery();

  useEffect(() => {
    getFan({id: route.params.id});
    console.log(route.params);
  }, [getFan, route.params]);

  useEffect(() => {
    if (!isLoading && !isError && fan) {
      if (fan.species) {
        const specieId = fan.species[0]?.split('/')[5];
        getSpecie({id: specieId});
      }
      const homeworId = fan.homeworld.split('/')[5];
      getWorld({id: homeworId});
    }
  }, [isLoading, isError, fan, getSpecie, getWorld]);

  return (
    <SafeAreaView>
      {!isError && !isLoading && fan && (
        <Card style={styles.card}>
          <Card.Title title={fan?.name} />
          <Card.Content>
            <Paragraph>
              Gender: {fan.gender} {'\n'}
              Height: {fan.height}
              {'\n'}
              Mass: {fan.mass} {'\n'}
              Birth year: {fan.birth_year} {'\n'}
              Eye color: {fan.eye_color} {'\n'}
              {specie
                ? `Species: ${specie?.name} Language: ${
                    specie?.language
                  } ${'\n'}`
                : ''}
              Home World: {world?.name}
            </Paragraph>
          </Card.Content>
        </Card>
      )}
      {isLoading && (
        <ActivityIndicator
          animating={true}
          color={theme.colors.error}
          style={styles.loader}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
  },
  loader: {
    marginTop: 20,
  },
});

export default DetailsScreen;
