import React, {FC} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import HeroItem from './HeroItem';
import {FansListItem} from '../../interfaces/Fans/FansListItem';

interface HeroListProps {
  fans: FansListItem[];
  onEndReached: () => void;
}

const HeroList: FC<HeroListProps> = ({fans, onEndReached}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={fans}
        keyExtractor={item => item.url}
        contentContainerStyle={styles.contentContainerStyle}
        onEndReachedThreshold={0.2}
        onEndReached={onEndReached}
        renderItem={({item}) => (
          <HeroItem
            name={item.name}
            birth_year={item.birth_year}
            gender={item.gender}
            url={item.url}
            style={styles.card}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  card: {
    marginBottom: 10,
  },
});

export default HeroList;
