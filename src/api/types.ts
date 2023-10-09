export interface Organization {
  id: number;
  imageUrl: string;
  name: string;
  isSubscribed: boolean;
}

export interface OrganizationEvent {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  organization: Organization;
  lastUpdatedDate: string;
}
