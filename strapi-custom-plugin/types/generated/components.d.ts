import type { Schema, Attribute } from '@strapi/strapi';

export interface ContentManagementContentManagement extends Schema.Component {
  collectionName: 'components_content_management_content_managements';
  info: {
    displayName: 'content-management';
    icon: 'stack';
    description: '';
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
        maxLength: 40;
      }>;
    content: Attribute.RichText;
    metatitle: Attribute.String;
    metadescription: Attribute.String;
    metakeywords: Attribute.String;
    image: Attribute.Media;
    slug: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'content-management.content-management': ContentManagementContentManagement;
    }
  }
}
