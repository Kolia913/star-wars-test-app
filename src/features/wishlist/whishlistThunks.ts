import {createAsyncThunk} from '@reduxjs/toolkit';
import {FansListItem} from '../../interfaces/Fans/FansListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FEMALE_GENDER, MALE_GENDER, WishlistState} from './wishlistSlice';

export const ASYNC_STORAGE_FANS_KEY = 'fans';

export const addToWishlist = createAsyncThunk<FansListItem, FansListItem>(
  'wishlist/add',
  async fan => {
    const fans = await getWhishlist();
    if (fans && fans.length) {
      fans.push(fan);
      await AsyncStorage.setItem(ASYNC_STORAGE_FANS_KEY, JSON.stringify(fans));
    } else {
      await AsyncStorage.setItem(
        ASYNC_STORAGE_FANS_KEY,
        JSON.stringify([{...fan}]),
      );
    }
    return fan;
  },
);

export const removeFromWishlist = createAsyncThunk<FansListItem, FansListItem>(
  'wishlist/remove',
  async fan => {
    const fans: FansListItem[] = await getWhishlist();
    if (fans && fans.length) {
      await AsyncStorage.setItem(
        ASYNC_STORAGE_FANS_KEY,
        JSON.stringify(fans.filter(item => item.url.trim() !== fan.url.trim())),
      );
    }
    return fan;
  },
);

export const getStatistics = createAsyncThunk<WishlistState, void>(
  'wishlist/stats',
  async () => {
    const fans = await getWhishlist();
    const stats: WishlistState = {
      maleCount: 0,
      femaleCount: 0,
      othersCount: 0,
    };
    if (fans && fans.length) {
      for (let item of fans) {
        if (item.gender === MALE_GENDER) {
          stats.maleCount++;
        } else if (item.gender === FEMALE_GENDER) {
          stats.femaleCount++;
        } else {
          stats.othersCount++;
        }
      }
    }
    return stats;
  },
);

export const flushWishlist = createAsyncThunk<void, void>(
  'wishlist/flush',
  async () => {
    await AsyncStorage.setItem(ASYNC_STORAGE_FANS_KEY, '[]');
  },
);

const getWhishlist = async (): Promise<FansListItem[]> => {
  const fansString: string | null = await AsyncStorage.getItem(
    ASYNC_STORAGE_FANS_KEY,
  );
  const fans: FansListItem[] = JSON.parse(fansString ? fansString : '[]');
  return fans;
};
