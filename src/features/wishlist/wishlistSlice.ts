import {createSlice} from '@reduxjs/toolkit';
import {
  addToWishlist,
  flushWishlist,
  getStatistics,
  removeFromWishlist,
} from './whishlistThunks';

export const MALE_GENDER = 'male';
export const FEMALE_GENDER = 'female';

export interface WishlistState {
  maleCount: number;
  femaleCount: number;
  othersCount: number;
}

const initialState: WishlistState = {
  maleCount: 0,
  femaleCount: 0,
  othersCount: 0,
};

function changeGenderCount(
  state: WishlistState,
  gender: string,
  opration: 'add' | 'reduce',
) {
  if (gender === MALE_GENDER) {
    opration === 'add' ? state.maleCount++ : state.maleCount--;
  } else if (gender === FEMALE_GENDER) {
    opration === 'add' ? state.femaleCount++ : state.femaleCount--;
  } else {
    opration === 'add' ? state.othersCount++ : state.othersCount--;
  }
}

const wishlistSlice = createSlice({
  name: 'whishlist',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addToWishlist.fulfilled, (state, action) => {
      const gender = action.payload.gender;
      changeGenderCount(state, gender, 'add');
    });
    builder.addCase(removeFromWishlist.fulfilled, (state, action) => {
      const gender = action.payload.gender;
      changeGenderCount(state, gender, 'reduce');
    });
    builder.addCase(getStatistics.fulfilled, (state, action) => {
      state.maleCount = action.payload.maleCount;
      state.femaleCount = action.payload.femaleCount;
      state.othersCount = action.payload.othersCount;
    });
    builder.addCase(flushWishlist.fulfilled, (state, _action) => {
      state.maleCount = 0;
      state.femaleCount = 0;
      state.othersCount = 0;
    });
  },
});

export default wishlistSlice.reducer;
