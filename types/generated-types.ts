/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "metadata".
 */
export interface Metadata {
  id: string;
  meta: {
    title?: string;
    description?: string;
    image?: string | Media;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "sections".
 */
export interface Sections {
  id: string;
  hero: {
    title: string;
    'section-id': string;
  };
  about: {
    title: string;
    'section-id': string;
  };
  intrests: {
    title: string;
    'section-id': string;
  };
  projects: {
    title: string;
    'section-id': string;
  };
  journal: {
    title: string;
    'section-id': string;
  };
  tools: {
    title: string;
    'section-id': string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "navigation".
 */
export interface Navigation {
  id: string;
  items: {
    section: string;
    'section-id': string;
    id?: string;
  }[];
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contacts".
 */
export interface Contacts {
  id: string;
  eamil: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "interests".
 */
export interface Interest {
  id: string;
  type?: string;
  intrest: {
    title: string;
    image: string | Media;
    link?: string;
    id?: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "notes".
 */
export interface Note {
  id: string;
  title: string;
  date: string;
  image: string | Media;
  link: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "projects".
 */
export interface Project {
  id: string;
  title: string;
  status?: 'planned' | 'inProgress' | 'published' | 'archived';
  image?: string | Media;
  link?: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tools".
 */
export interface Tool {
  id: string;
  title: string;
  image: string | Media;
  link: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "social".
 */
export interface Social {
  id: string;
  title: string;
  image: string | Media;
  link: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  createdAt: string;
  updatedAt: string;
}