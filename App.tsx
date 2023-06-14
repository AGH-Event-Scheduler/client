import React, { useState } from 'react';
import {  StyleSheet } from 'react-native';
import { OrganizationListView } from './components/organization/OrganizationListView';
import { ViewLayoutStructure } from './components/foundation/ViewLayoutStructure';

export default function App() {
  return (
      <ViewLayoutStructure>
         <OrganizationListView></OrganizationListView>
      </ViewLayoutStructure>
  );
}
