export interface Organization {
  id: number;
  imageUrl: string;
  name: string;
  isSubscribed: boolean;
}

export interface OrgEvent {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  organizationName: string;
  lastEdit: Date;
}