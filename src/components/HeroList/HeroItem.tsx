import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {Card, Text} from 'react-native-paper';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {theme} from '../../constants/theme';
import {FansListItem} from '../../interfaces/Fans/FansListItem';
import {
  ASYNC_STORAGE_FANS_KEY,
  addToWishlist,
  removeFromWishlist,
} from '../../features/wishlist/whishlistThunks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useNavigation} from '@react-navigation/native';

interface HeroItemProps extends TouchableOpacityProps {}

const HeroItem: FC<HeroItemProps & FansListItem> = ({
  name,
  birth_year,
  gender,
  url,
  ...props
}) => {
  const navigation = useNavigation<any>();

  const dispatch = useAppDispatch();
  const {femaleCount, maleCount, othersCount} = useAppSelector(
    state => state.wishlist,
  );
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);

  useEffect(() => {
    AsyncStorage.getItem(ASYNC_STORAGE_FANS_KEY).then(
      (itemsString: string | null) => {
        if (itemsString) {
          const items: FansListItem[] = JSON.parse(itemsString);
          setIsInWishlist(!!items.find(el => el.url.trim() === url.trim()));
        } else {
          setIsInWishlist(false);
        }
      },
    );
  }, [url]);

  useEffect(() => {
    AsyncStorage.getItem(ASYNC_STORAGE_FANS_KEY).then(
      (itemsString: string | null) => {
        if (itemsString) {
          const items: FansListItem[] = JSON.parse(itemsString);
          setIsInWishlist(!!items.find(item => item.url.trim() === url.trim()));
        }
      },
    );
  }, [femaleCount, maleCount, othersCount, url]);

  const heartIcon = ({size}: {size: number}) =>
    isInWishlist ? (
      <AntDesignIcons
        name="heart"
        color={theme.colors.error}
        onPress={onHeartIconPress}
        size={size}
      />
    ) : (
      <AntDesignIcons
        name="hearto"
        color={theme.colors.error}
        onPress={onHeartIconPress}
        size={size}
      />
    );

  const onHeartIconPress = async () => {
    const item: FansListItem = {
      birth_year,
      gender,
      name,
      url,
    };
    if (isInWishlist) {
      await dispatch(removeFromWishlist(item));
    } else {
      await dispatch(addToWishlist(item));
    }
    setIsInWishlist(!isInWishlist);
  };

  const onCardPress = () => {
    const id = url.split('/')[5];
    navigation.navigate('DetailScreen', {id});
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onCardPress} {...props}>
      <Card>
        <Card.Title
          title={name}
          right={heartIcon}
          rightStyle={styles.heartIcon}
        />
        <Card.Content>
          <Text>Gender: {gender}</Text>
          <Text>Birth Year: {birth_year}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  heartIcon: {
    marginRight: 10,
  },
});

export default HeroItem;
