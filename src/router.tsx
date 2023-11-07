import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createNativeStackNavigator();

const RouterList: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{gestureEnabled: false}}
      initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default RouterList;
