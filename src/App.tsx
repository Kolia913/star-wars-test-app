import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';
import RouterList from './router';
import store from './store';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <SafeAreaProvider>
            <RouterList />
          </SafeAreaProvider>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
