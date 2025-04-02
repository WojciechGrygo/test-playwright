import { APIRequestContext } from '@playwright/test';

export async function loginViaAPI(request: APIRequestContext) {
  const userName = process.env.USERNAME!;
  const password = process.env.PASSWORD!;

  await request.post('http://localhost:3000/process_login', {
    data: {
      username: userName,
      password: password,
      //   redirectURL: 'http://localhost:3000/welcome',
    },
  });
}
