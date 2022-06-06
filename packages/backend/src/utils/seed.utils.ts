/* eslint-disable class-methods-use-this */
import faker from '@faker-js/faker';
import needle from 'needle';
import { IBlogPost } from '../models/blogPost';
import { IGroup } from '../models/group';
import { IPost } from '../models/post';
import { ITestimonial } from '../models/testimonial';
import { IUser } from '../models/user';

export class Seeder {
  seedPosts() {
    needle('get', 'localhost:7777/api/posts')
      .then(() => {
        const seedPostIds: string[] = [];

        for (let i = 1; i <= 5; i++) {
          const currentPostId = faker.database.mongodbObjectId();
          const data: IPost = {
            id: currentPostId,
            user: {
              id: 'b7672ee9e2df8b994f57d6c8',
              name: 'Phillip Fry',
            },
            date: faker.date.past(1),
            group: faker.helpers.arrayElement([
              {
                id: 'd4ede503afc80d236bb428e5',
                name: 'Refined Intelligent Wooden Sausages',
              },
              {
                id: '51e7ca34eeaedbe721b68a04',
                name: 'Rustic Small Granite Chips',
              },
              {
                id: 'ec5cad5219efadbb26a4368e',
                name: 'Fantastic Intelligent Rubber Ball',
              },
            ]),
            oneOnOneUserId: '',
            text: faker.lorem.sentence(),
            media: faker.image.animals(),
          };

          needle('post', 'localhost:7777/api/posts', data, { json: true });
          seedPostIds.push(currentPostId);
        }

        console.log('Post seed data generated!');
      })
      .catch((err) => console.log(err));
  }

  seedGroups() {
    needle('get', 'localhost:7777/api/groups')
      .then(() => {
        const seedGroupIds: string[] = [];

        for (let i = 1; i <= 3; i++) {
          const currentGroupId = faker.database.mongodbObjectId();
          const data: IGroup = {
            id: currentGroupId,
            name: `${faker.commerce.productAdjective()} ${faker.commerce.productName()}`,
            members: [
              {
                id: 'b7672ee9e2df8b994f57d6c8',
                name: 'Phillip Fry',
                email: 'fry@planetExpress.com',
                role: 'dev',
                dogName: 'Test',
                dogName2: '',
                dogName3: '',
                dogName4: '',
                dogName5: '',
              },
            ],
          };

          needle('post', 'localhost:7777/api/groups', data, { json: true });
          seedGroupIds.push(currentGroupId);
        }

        console.log('Group seed data generated!');
      })
      .catch((err) => console.log(err));
  }

  seedBlogPosts() {
    needle('get', 'localhost:7777/api/blogPosts')
      .then(() => {
        const seedBlogPostIds: string[] = [];

        for (let i = 1; i <= 5; i++) {
          const currentBlogPostId = faker.database.mongodbObjectId();
          const data: IBlogPost = {
            id: currentBlogPostId,
            title: `${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} ${faker.commerce.productName()}`,
            date: faker.date.past(1),
            post: faker.lorem.paragraphs(),
            image: faker.image.animals(),
          };

          needle('post', 'localhost:7777/api/blogPosts', data, { json: true });
          seedBlogPostIds.push(currentBlogPostId);
        }

        console.log('Blog Post seed data generated!');
      })
      .catch((err) => console.log(err));
  }

  seedTestimonials() {
    needle('get', 'localhost:7777/api/testimonials')
      .then(() => {
        const seedTestimonialIds: string[] = [];

        for (let i = 1; i <= 10; i++) {
          const currentTestimonialId = faker.database.mongodbObjectId();
          const data: ITestimonial = {
            id: currentTestimonialId,
            title: `${faker.name.firstName()} ${faker.name.lastName()} & ${faker.name.firstName()}`,
            date: faker.date.recent(
              faker.helpers.arrayElement([1, 18, 68, 30, 54, 42, 29, 26, 12, 71]),
            ),
            review: faker.lorem.paragraphs(),
            image: faker.image.animals(),
          };

          needle('post', 'localhost:7777/api/testimonials', data, { json: true });
          seedTestimonialIds.push(currentTestimonialId);
        }

        console.log('Testimonial seed data generated!');
      })
      .catch((err) => console.log(err));
  }

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
    this.seedTestimonials();
    this.seedBlogPosts();
    this.seedGroups();
    this.seedPosts();
  }
}

export default Seeder;
