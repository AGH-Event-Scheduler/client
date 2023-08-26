import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { ViewLayoutStructure } from './src/components/ViewLayoutStructure';
import { OrganizationListView } from './src/components/organizations/OrganizationListView';
import { OrganizationDetailsView } from './src/pages/organization-details/OrganizationDetailsView';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ViewLayoutStructure>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: true}}>
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
