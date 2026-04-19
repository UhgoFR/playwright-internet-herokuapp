import {test, expect} from '@playwright/test';
import {BasicAuthPage, DigestAuthPage, HomePage} from '../../pages/internet-herokuapp';


let homePage: HomePage;
let basicAuthPage: BasicAuthPage;
let digestAuthPage: DigestAuthPage;
let baseUrl: string = process.env.BASE_URL ?? '';
let username: string = process.env.username ?? '';
let password: string = process.env.password ?? '';



test.describe('Basic Authentication Tests @auth-tests, @heroku-app', () => {

  test.beforeEach(async ({ browser}) => {
    // 1. Creamos contexto con credenciales
    const context = await browser.newContext({
        httpCredentials: { username: username, password: password }
    });
  const page = await context.newPage();
    homePage = new HomePage(page);
    basicAuthPage = new BasicAuthPage(page);
    digestAuthPage = new DigestAuthPage(page);
    await homePage.goto(baseUrl);
    await homePage.waitForPageLoad();
  });

  test('Basic Auth: should display success message after successful authentication @auth-tests, @heroku-app', async () => {
    await homePage.basicAuthLink.click();
    await expect(basicAuthPage.header).toBeVisible();
    await expect(basicAuthPage.subHeader).toBeVisible();
  });

  test('Digest Authentication: should display success message after successful authentication @auth-tests, @heroku-app', async () => {
    homePage.digestAuthenticationLink.click();
    await expect(digestAuthPage.header).toBeVisible();
    await expect(digestAuthPage.subHeader).toBeVisible();
  });
});

test('Basic Auth: Login exitoso con Basic Auth @auth-tests, @heroku-app', async ({ browser }) => {
  // 1. Creamos contexto con credenciales
  const context = await browser.newContext({
    httpCredentials: { username: username, password: password }
  });
  const page = await context.newPage();
  
  // 2. Navegamos
  await page.goto(`${baseUrl}basic_auth`);

  // 3. Validamos que entramos (buscando el mensaje de éxito)
  const mensaje = page.locator('p');
  await expect(mensaje).toContainText('Congratulations!');
});

test('Digest Auth: Login exitoso con Digest Auth @auth-tests, @heroku-app', async ({ browser }) => {
  // 1. Creamos contexto con credenciales
  const context = await browser.newContext({
    httpCredentials: { username: username, password: password }
  });
  const page = await context.newPage();
  
  // 2. Navegamos
  await page.goto(`${baseUrl}digest_auth`);

  // 3. Validamos que entramos (buscando el mensaje de éxito)
  const mensaje = page.locator('p');
  await expect(mensaje).toContainText('Congratulations!');
}); 