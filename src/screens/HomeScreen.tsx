import React, {FC, useEffect, useState} from 'react';
import StatisticCard from '../components/StatisticCard';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import HeroList from '../components/HeroList/HeroList';
import {useGetFansQuery} from '../features/fans/fansApi';
import {ActivityIndicator, Button, Title} from 'react-native-paper';
import {FansListItem} from '../interfaces/Fans/FansListItem';
import {useAppSelector} from '../hooks/useAppSelector';
import {theme} from '../constants/theme';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {
  flushWishlist,
  getStatistics,
} from '../features/wishlist/whishlistThunks';

const {height} = Dimensions.get('window');

const HomeScreen: FC = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);
  const {isLoading, isError, data} = useGetFansQuery({page});
  const [fans, setFans] = useState<FansListItem[]>([]);
  const {femaleCount, maleCount, othersCount} = useAppSelector(
    state => state.wishlist,
  );
  useEffect(() => {
    if (data && !isError) {
      setFans(prevState => {
        if (!prevState.includes(data.results[0])) {
          return prevState.concat(data.results);
        } else {
          return prevState;
        }
      });
    }
  }, [data, page, isError]);

  const onEndReached = () => {
    if (data?.next) {
      setPage(prevState => prevState + 1);
    }
  };

  const onClearFans = async () => {
    await dispatch(flushWishlist());
    await dispatch(getStatistics());
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.stats}>
          <StatisticCard title="Male" count={maleCount} style={styles.card} />
          <StatisticCard
            title="Female"
            count={femaleCount}
            style={styles.card}
          />
          <StatisticCard
            title="Other"
            count={othersCount}
            style={styles.card}
          />
        </View>
        <View style={styles.listHeading}>
          <Title>Fans</Title>
          <Button
            mode="outlined"
            uppercase
            textColor={theme.colors.error}
            rippleColor={theme.colors.errorContainer}
            onPress={onClearFans}
            style={styles.button}>
            clear fans
          </Button>
        </View>
        <View style={styles.list}>
          {!isLoading && !isError && data && (
            <HeroList fans={fans} onEndReached={onEndReached} />
          )}
          {isLoading && (
            <ActivityIndicator animating={true} color={theme.colors.error} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    felx: 1,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: '30%',
  },
  list: {
    marginTop: 10,
    minHeight: height * 0.65,
  },
  button: {
    borderColor: theme.colors.error,
    textTransform: 'uppercase',
  },
  listHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    alignItems: 'center',
  },
});

export default HomeScreen;
