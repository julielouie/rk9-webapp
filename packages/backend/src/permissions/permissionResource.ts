export enum PermissionResource {
  CREATE = 'Create All',
  READ = 'Read All',
  UPDATE = 'Update All',
  DELETE = 'Delete All',
  READ_GROUP = 'Read Groups',
  CREATE_POST = 'Create Posts',
  READ_POST = 'Read Posts',
  UPDATE_POST = 'Update Posts',
  DELETE_POST = 'Delete Posts',
  READ_BLOG_POST = 'Read Blog Posts',
  READ_TESTIMONIAL = 'Read Testimonials',
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
