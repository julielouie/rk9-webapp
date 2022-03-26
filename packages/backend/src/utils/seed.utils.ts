/* eslint-disable class-methods-use-this */
import faker from '@faker-js/faker';
import needle from 'needle';

export class Seeder {
  seed() {
    needle('get', 'localhost:7777/api/users')
      .then((res) => {
        if (res.body.length === 0) {
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

          console.log('Seed data generated!');
        }
      })
      .catch((err) => console.log(err));
  }
}

export default Seeder;
