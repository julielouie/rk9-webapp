export enum PermissionResource {
  READ = 'Read an existing document',
  UPDATE = 'Update/save an existing document',
  CREATE = 'Create a new document',
  DELETE = 'Delete an existing document',
}

export const grantsObject = {
  admin: {
    grants: [
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
        resource: PermissionResource.CREATE,
        action: 'create',
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
        action: '*',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.CREATE,
        action: 'create',
        attributes: ['*'],
      },
      {
        resource: PermissionResource.DELETE,
        action: 'delete',
        attributes: ['*'],
      },
    ],
  },
  guest: {
    grants: [
      {
        resource: PermissionResource.READ,
        action: 'read',
        attributes: ['*'],
      },
    ],
  },
};
