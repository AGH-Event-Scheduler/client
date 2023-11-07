export interface Image {
  imageId: string;
  smallFilename: string;
  mediumFilename: string;
  bigFilename: string;
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
  nameTranslated: string;
  backgroundImage: Image;
  descriptionTranslated: string;
  startDate: string;
  endDate: string;
  locationTranslated: string;
  underOrganization: Organization;
}

export interface User extends BaseEntity {
  email: string;
  password: string;
}
