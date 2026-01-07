// import { STORAGE_STATE } from '@_pw-config';
// import * as fs from 'fs';
import { request } from '@playwright/test';

async function globalSetup(): Promise<void> {
  //  if (fs.existsSync(STORAGE_STATE)) {
  //    fs.unlinkSync(STORAGE_STATE);
  //  }
  console.log('⚠️ Global setup');
  const baseURL = process.env.BASE_URL;
  const requestContext = await request.newContext();

  try {
    const response = await requestContext.get(baseURL!);
    console.log('Response ok?', response.ok());
  } catch {
    throw new Error(
      `❌ Failed to connect to ${baseURL}
     check if the application is running and the baseUrl is correct`,
    );
  }
}

export default globalSetup;
