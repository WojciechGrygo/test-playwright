import { faker } from '@faker-js/faker';

export function generateUserData() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    firstName,
    lastName,
    email: faker.internet.email({ firstName: firstName, lastName: lastName }),
    password: faker.internet.password(),
  };
}
