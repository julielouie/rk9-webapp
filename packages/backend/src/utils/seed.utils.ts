/* eslint-disable class-methods-use-this */
import faker from '@faker-js/faker';
import needle from 'needle';
import { IUser } from '../models/user';

export class Seeder {
  seedUsers() {
    needle('get', 'localhost:7777/api/users')
      .then(() => {
        const seedUserIds: string[] = [];

        const fryUserId = faker.database.mongodbObjectId();
        const fryUser: IUser = {
          id: fryUserId,
          name: 'Phillip Fry',
          email: 'fry@planetExpress.com',
          password: 'fry',
          groups: [
            {
              id: faker.database.mongodbObjectId(),
              name: 'Discussion',
            },
            {
              id: faker.database.mongodbObjectId(),
              name: 'Advanced Group',
            },
            {
              id: faker.database.mongodbObjectId(),
              name: 'Bite Club',
            },
          ],
          role: 'dev',
          dogName: 'Test',
        };

        needle('post', 'localhost:7777/api/users', fryUser, { json: true });
        seedUserIds.push(fryUserId);

        for (let i = 1; i <= 30; i++) {
          const currentUserId = faker.database.mongodbObjectId();
          const data: IUser = {
            id: currentUserId,
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            email: faker.internet.email(),
            password: faker.internet.password(),
            groups: [
              {
                id: faker.database.mongodbObjectId(),
                name: 'Discussion',
              },
              {
                id: faker.database.mongodbObjectId(),
                name: faker.helpers.arrayElement(['Advanced Group', 'Bite Club']),
              },
            ],
            role: faker.helpers.arrayElement(['admin', 'client']),
            dogName: faker.animal.dog(),
          };

          needle('post', 'localhost:7777/api/users', data, { json: true });
          seedUserIds.push(currentUserId);
        }

        console.log('User seed data generated!');
      })
      .catch((err) => console.log(err));
  }

  seed() {
    this.seedUsers();
  }
}

export default Seeder;
