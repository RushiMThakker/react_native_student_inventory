import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import store from './src/store';
import ListScreen from './src/screens/ListScreen';
import AddStudentScreen from './src/screens/AddStudentScreen';
import FormScreen from './src/screens/FormScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Add" component={AddStudentScreen} />
        <Stack.Screen name="Form" component={FormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const ReduxApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default ReduxApp;
