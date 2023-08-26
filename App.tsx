import React from 'react';
import { OrganizationListView } from './src/pages/organizations/OrganizationListView';
import { ViewLayoutStructure } from './src/components/ViewLayoutStructure';

export default function App() {
  return (
      <ViewLayoutStructure>
         <OrganizationListView></OrganizationListView>
      </ViewLayoutStructure>
  );
}
