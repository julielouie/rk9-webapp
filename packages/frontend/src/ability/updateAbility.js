/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable no-fallthrough */
import { AbilityBuilder } from '@casl/ability';
import { Role } from '../types/Role';

export const updateAbility = (ability, userRole) => {
  const { can, rules } = new AbilityBuilder();

  const abilities = {
    C: () => can('create', 'All'),
    R: () => can('read', 'All'),
    U: () => can('update', 'All'),
    D: () => can('delete', 'All'),
    RG: () => can('read', 'Groups'),
    CP: () => can('create', 'Posts'),
    UP: () => can('update', 'Posts'),
    DP: () => can('delete', 'Posts'),
    RBP: () => can('read', 'Blog Posts'),
    RT: () => can('read', 'Testimonials'),
    CO: () => can('create', 'Orders'),
    RO: () => can('read', 'Orders'),
  };

  switch (userRole) {
    case Role.Admin:
      abilities.C();
      abilities.U();
      abilities.D();
      abilities.RO();
    case Role.Client:
      abilities.R();
      abilities.CP();
      abilities.UP();
      abilities.DP();
      abilities.CO();
    default:
      abilities.RG();
      abilities.RBP();
      abilities.RT();
  }

  ability.update(rules);
};

export default updateAbility;
