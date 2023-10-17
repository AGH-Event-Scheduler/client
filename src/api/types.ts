export interface Image {
  smallUrl: string;
  mediumUrl: string;
  bigUrl: string;
}

interface BaseEntity {
  id: number;
  creationDate: string;
  lastUpdatedDate: string;
}

export interface Organization extends BaseEntity {
  name: string;
  logoImage: Image;
  backgroundImage: Image;
  isSubscribed: boolean;
  description: string;
}

export interface OrganizationEvent extends BaseEntity {
  name: string;
  backgroundImage: Image;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  organization: Organization;
}
