import React from 'react';
import { ViewLayoutStructure } from './components/foundation/ViewLayoutStructure';
import { OrganizationDetailsView } from './components/organization-details/OrganizationDetailsView';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { OrganizationListView } from './components/organization/OrganizationListView';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ViewLayoutStructure>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Organizations"
            component={OrganizationListView}
          />
          <Stack.Screen 
          name="Organization" 
          component={OrganizationDetailsView} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ViewLayoutStructure>
  );
}
