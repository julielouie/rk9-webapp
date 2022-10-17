export enum PermissionResource {
  CREATE = 'Create All',
  READ = 'Read All',
  READ_ORDER = 'Read Order',
  UPDATE = 'Update All',
  DELETE = 'Delete All',
  UPDATE_USER = 'Update User General Info',
  READ_GROUP = 'Read Groups',
  CREATE_POST = 'Create Posts',
  READ_POST = 'Read Posts',
  UPDATE_POST = 'Update Posts',
  DELETE_POST = 'Delete Posts',
  READ_BLOG_POST = 'Read Blog Posts',
  READ_TESTIMONIAL = 'Read Testimonials',
  CREATE_ORDER = 'Create Order',
}

export const grantsObject = {
  admin: {
    grants: [
      {
        resource: PermissionResource.CREATE,
        action: 'create',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.READ,
        action: 'read',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.UPDATE,
        action: 'update',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.DELETE,
        action: 'delete',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.UPDATE_USER,
        action: 'update',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.CREATE_POST,
        action: 'create',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.UPDATE_POST,
        action: 'update',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.DELETE_POST,
        action: 'delete',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.READ_GROUP,
        action: 'read',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.READ_POST,
        action: 'read',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.READ_BLOG_POST,
        action: 'read',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.READ_TESTIMONIAL,
        action: 'read',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.READ_ORDER,
        action: 'read',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.CREATE_ORDER,
        action: 'create',
        attributes: ['*'],
      },
    ],
  },
  client: {
    grants: [
      {
        resource: PermissionResource.READ,
        action: 'read',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.CREATE_POST,
        action: 'create',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.UPDATE_POST,
        action: 'update',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.DELETE_POST,
        action: 'delete',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.CREATE_ORDER,
        action: 'create',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.UPDATE_USER,
        action: 'update',
        attributes: ['*'],
      },
    ],
  },
  guest: {
    grants: [
      {
        resource: PermissionResource.READ_GROUP,
        action: 'read',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.READ_POST,
        action: 'read',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.READ_BLOG_POST,
        action: 'read',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.READ_TESTIMONIAL,
        action: 'read',
        attributes: ['*'],
      },
    ],
  },
};
