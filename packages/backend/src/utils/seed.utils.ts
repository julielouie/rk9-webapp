/* eslint-disable class-methods-use-this */
import faker from '@faker-js/faker';
import needle from 'needle';

export class Seeder {
  seedUsers() {
    needle('get', 'localhost:7777/api/users')
      .then(() => {
        const seedUserIds: string[] = [];

        for (let i = 1; i <= 30; i++) {
          const currentUserId = faker.datatype.uuid();

          if (!seedUserIds.includes(currentUserId)) {
            const data = {
              id: currentUserId,
              username: faker.internet.userName(),
              name: `${faker.name.firstName()} ${faker.name.lastName()}`,
              email: faker.internet.email(),
            };

            needle('post', 'localhost:7777/api/users', data, { json: true });
            seedUserIds.push(currentUserId);
          }
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
