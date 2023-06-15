import React, { useState } from 'react';
import {  StyleSheet } from 'react-native';
import { ViewLayoutStructure } from './components/foundation/ViewLayoutStructure';
import { OrganizationDetailsView } from './components/organization-details/OrganizationDetailsView';

export default function App() {
  return (
      <ViewLayoutStructure>
         {/* <OrganizationListView></OrganizationListView> */}
        <OrganizationDetailsView
          organizationId={1}
        ></OrganizationDetailsView>
      </ViewLayoutStructure>
  );
}
