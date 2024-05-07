import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Register from './screens/Register';
import React from 'react';
import { MyContextControllerProvider } from './store/Index';
import Home from './screens/Home';

const Stack = createStackNavigator();
export default function App() {
  return (
    <MyContextControllerProvider>
      <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator
             initialRouteName="Login"
             screenOptions={{
              headerStyle: { backgroundColor: 'royalblue' },
              headerTintColor: 'white', 
            }}
             >
            <Stack.Screen name="Login" component={Login} options={{headerTitle: 'Đăng nhập', headerTitleAlign: 'center'}}/>
            <Stack.Screen name="Home" component={Home} options={{headerTitle: 'Trang chủ', headerTitleAlign: 'left'}} />
            <Stack.Screen name="Register" component={Register} options={{headerTitle: 'Đăng ký', headerTitleAlign: 'center'}} />
          </Stack.Navigator>
        </NavigationContainer>
    </MyContextControllerProvider>
        
  );
}
