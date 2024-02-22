
import React from 'react';
import DisplayStaffList from './screens/StaffListScreen';
import AddNewStaff from './screens/StaffAddScreen';
import ViewStaffDetail from './screens/StaffDetailScreen';
import EditStaffDetail from './screens/StaffUpdateScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';


//component={component/function name}
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Staff Contact System">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="StaffContactList" component={DisplayStaffList} />
        <Stack.Screen name="ViewStaffDetails" component={ViewStaffDetail} />
        <Stack.Screen name="AddNewStaff" component={AddNewStaff} />
        <Stack.Screen name="EditStaffDetail" component={EditStaffDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

