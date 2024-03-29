import i18next from "../localization/i18next";

export enum Language {
  PL = "PL",
  EN = "EN",
}

export interface MultiLanguageText {
  PL: string;
  EN: string;
}

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
  isArchived: boolean;
}

export interface FullOrganization extends BaseEntity {
  nameMap: MultiLanguageText;
  logoImage: Image;
  backgroundImage: Image;
  descriptionMap: MultiLanguageText;
}

export interface OrganizationEvent extends BaseEntity {
  nameTranslated: string;
  backgroundImage: Image;
  descriptionTranslated: string;
  startDate: string;
  endDate: string;
  locationTranslated: string;
  underOrganization: Organization;
  isSaved: boolean;
  canceled: boolean;
}

export interface FullOrganizationEvent extends BaseEntity {
  nameMap: MultiLanguageText;
  backgroundImage: Image;
  descriptionMap: MultiLanguageText;
  startDate: string;
  endDate: string;
  locationMap: MultiLanguageText;
}

export interface User {
  email: string;
  name: string;
  lastname: string;
}

export interface UserWithRole {
  email: string;
  name: string;
  lastname: string;
  role: OrganizationRole;
  organizationId: number;
}

export enum FeedNotificationType {
  EVENT_CREATE = "EVENT_CREATE",
  EVENT_UPDATE = "EVENT_UPDATE",
  EVENT_CANCEL = "EVENT_CANCEL",
  EVENT_REACTIVATE = "EVENT_REACTIVATE",
  ORGANIZATION_CREATE = "ORGANIZATION_CREATE",
  ORGANIZATION_UPDATE = "ORGANIZATION_UPDATE",
  ORGANIZATION_ARCHIVE = "ORGANIZATION_ARCHIVE",
  ORGANIZATION_REACTIVATE = "ORGANIZATION_REACTIVATE",
}

export interface FeedNotification extends BaseEntity {
  type: FeedNotificationType;
  regardingOrganizationDto?: Organization;
  regardingEventDTO?: OrganizationEvent;
  seen: boolean;
}

export enum OrganizationRole {
  CONTENT_CREATOR = "CONTENT_CREATOR",
  HEAD = "HEAD",
}

interface OrganizationRoleOption {
  index: string;
  translation: string;
}

export const organizationRoles: OrganizationRoleOption[] = [
  { index: "USER", translation: i18next.t("roles.USER") },
  { index: "HEAD", translation: i18next.t("roles.HEAD") },
  { index: "CONTENT_CREATOR", translation: i18next.t("roles.CONTENT_CREATOR") },
];

export interface Page<T> {
  content: T[];
  number: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}
