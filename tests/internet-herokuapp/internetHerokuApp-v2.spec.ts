import { test, expect } from '../../fixtures/herokuapp-fixtures';

test.describe('Home Page Tests @heroku-app', () => {

  test('should display the correct header', async ({ homePage }) => {
    await expect(homePage.header).toBeVisible();
    await expect(homePage.header).toHaveText('Welcome to the-internet');
  });

  test('should have a link to A/B Testing', async ({ homePage }) => {
    await expect(homePage.ABTesting_link).toBeVisible();
    await expect(homePage.ABTesting_link).toHaveAttribute('href', '/abtest');
  });

});

test('should navigate to Challenging DOM page and see all the elements @heroku-app', async ({ homePage, challenginDomPage }) => {
    await homePage.challengingDomLink.click();
    await challenginDomPage.waitForPageLoad();
    await expect(challenginDomPage.header).toBeVisible();
    await expect(challenginDomPage.buttonOne).toBeVisible();
    await challenginDomPage.buttonOne.click();
    await expect(challenginDomPage.buttonTwo).toBeVisible();
    await challenginDomPage.buttonTwo.click();
    await expect(challenginDomPage.buttonThree).toBeVisible();
    await challenginDomPage.buttonThree.click();
    await expect(challenginDomPage.canvas).toBeVisible();
    await expect(challenginDomPage.table).toBeVisible();
    await expect(challenginDomPage.header).toHaveText('Challenging DOM');
});

test('Should interact with checkboxes and verify their state @heroku-app', async ({ homePage, checkBoxesPage }) => {
    await homePage.checkboxesLink.click();
    await checkBoxesPage.waitForPageLoad();
    await expect(checkBoxesPage.header).toBeVisible();
    await expect(checkBoxesPage.checkboxOne).toBeVisible();
    await expect(checkBoxesPage.checkboxTwo).toBeVisible();

    await expect(checkBoxesPage.checkboxOne).not.toBeChecked();
    await expect(checkBoxesPage.checkboxTwo).toBeChecked();

    await checkBoxesPage.checkAllCheckboxes();
    await expect(checkBoxesPage.checkboxOne).toBeChecked();
    await expect(checkBoxesPage.checkboxTwo).toBeChecked();

    await checkBoxesPage.uncheckAllCheckboxes();
    await expect(checkBoxesPage.checkboxOne).not.toBeChecked();
    await expect(checkBoxesPage.checkboxTwo).not.toBeChecked();

    await checkBoxesPage.toggleCheckboxOne();
    await expect(checkBoxesPage.checkboxOne).toBeChecked();
    await expect(checkBoxesPage.checkboxTwo).not.toBeChecked();

    await checkBoxesPage.toggleCheckboxTwo();
    await expect(checkBoxesPage.checkboxOne).toBeChecked();
    await expect(checkBoxesPage.checkboxTwo).toBeChecked();
});

test('debe mostrar alerta al hacer clic derecho @heroku-app', async ({ homePage, contextMenuPage }) => {
    await homePage.contextMenuLink.click();
    await contextMenuPage.waitForPageLoad();

    const dialog = await contextMenuPage.triggerContextMenuWithOnce();
    await expect(dialog).toBeTruthy();
});

test('should drag and drop element A to B and then B to A @heroku-app', async ({ homePage, dragAndDropPage }) => {
    await homePage.dragAndDropLink.click();
    await dragAndDropPage.waitForPageLoad();
    await expect(dragAndDropPage.header).toBeVisible();
    await expect(dragAndDropPage.columnA).toBeVisible();
    await expect(dragAndDropPage.columnB).toBeVisible();

    await dragAndDropPage.dragAToB();
    await expect(dragAndDropPage.columnA).toHaveText('B');
    await expect(dragAndDropPage.columnB).toHaveText('A');

    await dragAndDropPage.dragBToA();
    await expect(dragAndDropPage.columnA).toHaveText('A');
    await expect(dragAndDropPage.columnB).toHaveText('B');

    await dragAndDropPage.dragManually(dragAndDropPage.columnA, dragAndDropPage.columnB);
    await expect(dragAndDropPage.columnA).toHaveText('B');
    await expect(dragAndDropPage.columnB).toHaveText('A');
});

test('should select an option from the dropdown and verify the selection @heroku-app', async ({ homePage, dropDownPage }) => {
    await homePage.dropdownLink.click();
    await dropDownPage.waitForPageLoad();
    await expect(dropDownPage.header).toBeVisible();
    await expect(dropDownPage.dropdown).toBeVisible();

    await dropDownPage.SelectOption('Option 1');
    const selectedOption = await dropDownPage.dropdown.inputValue();
    await expect(selectedOption).toBe('1');

    await dropDownPage.SelectOption('Option 2');
    const selectedOption2 = await dropDownPage.dropdown.inputValue();
    await expect(selectedOption2).toBe('2');
});

test('should add a new entry and verify its content @heroku-app', async ({ homePage, entryAddPage }) => {
    await homePage.entryAdLink.click();
    await entryAddPage.waitForPageLoad();

    await expect(entryAddPage.entryTitle).toBeVisible();
    const entryTitle = await entryAddPage.getEntryTitle();
    const entryContent = await entryAddPage.getEntryContent();

    await expect.soft(entryTitle).toBe('THIS IS A MODAL WINDOW');
    await expect.soft(entryContent).toContain("It's commonly used to encourage a user to take an action");
    await entryAddPage.closeButton.click();

    await expect(entryAddPage.header).toBeVisible();
});

test('should verify the floating menu is visible and functional @heroku-app', async ({ page, homePage, floatingMenuPage }) => {
    await homePage.floatingMenuLink.click();
    await floatingMenuPage.waitForPageLoad();
    await expect(floatingMenuPage.header).toBeVisible();
    await expect(floatingMenuPage.floatingMenu).toBeVisible();

    const isMenuVisible = await floatingMenuPage.isFloatingMenuVisible();
    await expect(isMenuVisible).toBe(true);

    await expect(floatingMenuPage.homeLink).toBeVisible();
    await expect(floatingMenuPage.newsLink).toBeVisible();
    await expect(floatingMenuPage.contactLink).toBeVisible();
    await expect(floatingMenuPage.aboutLink).toBeVisible();

    await floatingMenuPage.homeLink.click();
    await expect(page).toHaveURL(/^https?:\/\/.*#home$/);

    await floatingMenuPage.newsLink.click();
    await expect(page).toHaveURL(/^https?:\/\/.*#news$/);

    await floatingMenuPage.contactLink.click();
    await expect(page).toHaveURL(/^https?:\/\/.*#contact$/);

    await floatingMenuPage.aboutLink.click();
    await expect(page).toHaveURL(/^https?:\/\/.*#about$/);
});

test('should navigate to Frames page and verify nested frames content @heroku-app', async ({ homePage, framesPage, nestedFramesPage }) => {
    await homePage.framesLink.click();
    await framesPage.waitForPageLoad();
    await expect(framesPage.header).toBeVisible();

    await framesPage.nestedFramesLink.click();
    await nestedFramesPage.waitForPageLoad();

    const parentFrameText = await nestedFramesPage.getLeftFrameText();
    await expect(parentFrameText).toBe('LEFT');
    const middleFrameText = await nestedFramesPage.getMiddleFrameText();
    await expect(middleFrameText).toBe('MIDDLE');
    const rightFrameText = await nestedFramesPage.getRightFrameText();
    await expect(rightFrameText).toBe('RIGHT');
    const bottomFrameText = await nestedFramesPage.getBottomFrameText();
    await expect(bottomFrameText).toBe('BOTTOM');
});

test('should navigate to iFrame page and verify the content inside the iFrame @heroku-app', async ({ homePage, framesPage, iframePage }) => {
    await homePage.framesLink.click();
    await framesPage.waitForPageLoad();
    await expect(framesPage.header).toBeVisible();

    await framesPage.iFrameLink.click();
    await iframePage.waitForPageLoad();

    await iframePage.closeAlertBoxifVisible();

    const iFrameContent = await iframePage.getIFrameContent();
    await expect(iFrameContent).toBe('Your content goes here.');
});

test('should navigate to Horizontal Slider page and verify slider functionality @heroku-app', async ({ homePage, horizontalSliderPage }) => {
    await homePage.horizontalSliderLink.click();
    await horizontalSliderPage.waitForPageLoad();
    await expect(horizontalSliderPage.header).toBeVisible();

    await horizontalSliderPage.setSliderValue(3);
    const sliderValue = await horizontalSliderPage.getSliderValue();
    await expect(sliderValue).toBe('3');

    await horizontalSliderPage.setSliderValue(5);
    const sliderValue2 = await horizontalSliderPage.getSliderValue();
    await expect(sliderValue2).toBe('5');
});

test('should navigate to Hovers page and verify hover functionality @heroku-app', async ({ page, homePage, hoversPage }) => {
    await homePage.hoversLink.click();
    await hoversPage.waitForPageLoad();
    await expect(hoversPage.header).toBeVisible();

    const userName1 = await hoversPage.getUserName(1);
    await expect(userName1).toBe('user1');
    await hoversPage.clickViewProfile(1);
    await expect(page).toHaveURL(/\/users\/1$/);
    await page.goBack();

    const userName2 = await hoversPage.getUserName(2);
    await expect(userName2).toBe('user2');
    await hoversPage.clickViewProfile(2);
    await expect(page).toHaveURL(/\/users\/2$/);
    await page.goBack();

    const userName3 = await hoversPage.getUserName(3);
    await expect(userName3).toBe('user3');
    await hoversPage.clickViewProfile(3);
    await expect(page).toHaveURL(/\/users\/3$/);
    await page.goBack();
});

test('should navigate to JavaScript Alerts page and verify alert functionality @heroku-app', async ({ homePage, javaScriptAlertsPage }) => {
    await homePage.javascriptAlertsLink.click();
    await javaScriptAlertsPage.waitForPageLoad();
    await expect(javaScriptAlertsPage.header).toBeVisible();

    await javaScriptAlertsPage.triggerAlert('alert');
    await expect(await javaScriptAlertsPage.getResultText()).toBe('You successfully clicked an alert');

    await javaScriptAlertsPage.triggerAlert('confirm');
    await expect(await javaScriptAlertsPage.getResultText()).toBe('You clicked: Ok');

    await javaScriptAlertsPage.triggerAlert('prompt', 'Playwright');
    await expect(await javaScriptAlertsPage.getResultText()).toBe('You entered: Playwright');

    await javaScriptAlertsPage.triggerAlert('prompt');
    await expect(await javaScriptAlertsPage.getResultText()).toBe('You entered:');
});

test('should navigate to Key Presses page and verify key press functionality @heroku-app', async ({ homePage, keyPressesPage }) => {
    await homePage.keyPressesLink.click();
    await keyPressesPage.waitForPageLoad();
    await expect(keyPressesPage.header).toBeVisible();

    await keyPressesPage.pressKey('A');
    await expect(await keyPressesPage.getResultText()).toBe('You entered: A');

    await keyPressesPage.pressKey('Backspace');
    await expect(await keyPressesPage.getResultText()).toBe('You entered: BACK_SPACE');

    await keyPressesPage.pressKey('ArrowDown');
    await expect(await keyPressesPage.getResultText()).toBe('You entered: DOWN');
});

test('should navigate to Multiple Windows page and verify new window functionality @heroku-app', async ({ page, homePage, multipleWindowsPage }) => {
    await homePage.multipleWindowsLink.click();
    await multipleWindowsPage.waitForPageLoad();
    await expect(multipleWindowsPage.clickHereLink).toBeVisible();

    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        multipleWindowsPage.clickOnClickHereLink()
    ]);

    await newPage.waitForLoadState();
    await expect(newPage.locator('h3')).toHaveText('New Window');
    await newPage.close();
});

test('should navigate to Notification Message page and verify notification message functionality @heroku-app', async ({ homePage, notificationMessagePage }) => {
    await homePage.notificationMessagesLink.click();
    await notificationMessagePage.waitForPageLoad();
    await expect(notificationMessagePage.header).toBeVisible();
    await expect(notificationMessagePage.clickHereLink).toBeVisible();

    const notificationTextBeforeClick = await notificationMessagePage.getNotificationMessageText();
    await expect(notificationTextBeforeClick).toMatch('Action unsuccesful, please try again');

    await notificationMessagePage.clickHereLink.click();

    const notificationTextAfterClick = await notificationMessagePage.getNotificationMessageText();
    await expect(notificationTextAfterClick).toMatch('Action successful');
});

test('should navigate to Redirection page and verify redirection functionality @heroku-app', async ({ page, homePage, redirectionPage, statusCodesPage }) => {
    await homePage.redirectLinkLink.click();
    await redirectionPage.waitForPageLoad();
    await expect(redirectionPage.header).toBeVisible();
    await expect(redirectionPage.clickHereLink).toBeVisible();

    await redirectionPage.clickHereLink.click();

    await expect(page).toHaveURL(/\/status_codes$/);

    await expect(statusCodesPage.header).toBeVisible();
    await expect(statusCodesPage.header).toHaveText('Status Codes');

    await expect(statusCodesPage.statusCode200Link).toBeVisible();
    await expect(statusCodesPage.statusCode301Link).toBeVisible();
    await expect(statusCodesPage.statusCode404Link).toBeVisible();
    await expect(statusCodesPage.statusCode500Link).toBeVisible();
});

test('should navigate to Shadow DOM page and verify shadow DOM content @heroku-app', async ({ homePage, shadowDomPage }) => {
    await homePage.shadowDomLink.click();
    await shadowDomPage.waitForPageLoad();
    await expect(shadowDomPage.header).toBeVisible();

    const shadowElementText = await shadowDomPage.getShadowElementText();
    await expect(shadowElementText).toMatch(/^Let's have some different text!$/);

    const listItemText0 = await shadowDomPage.getListItemText(0);
    const listItemText1 = await shadowDomPage.getListItemText(1);
    await expect(listItemText0).toMatch(/^Let's have some different text!$/);
    await expect(listItemText1).toBe('In a list!');
});

test('Should navigate to Slow Resources page and verify that the page loads successfully @heroku-app', async ({ page, homePage, slowResourcesPage }) => {
    test.setTimeout(45000);

    const slowExternalResponsePromise = page.waitForResponse(
      (response) => response.url().includes('/slow_external') && response.request().method() === 'GET',
      { timeout: 35000 }
    );

    await homePage.slowResourcesLink.click();
    const slowExternalResponse = await slowExternalResponsePromise;
    await expect(slowExternalResponse.status()).toBe(503);
    await expect(slowExternalResponse.statusText()).toBe('Service Unavailable');

    await slowResourcesPage.waitForPageLoad();
    await expect(slowResourcesPage.header).toBeVisible();
    await expect(slowResourcesPage.header).toHaveText('Slow Resources');
});

test('should navigate to Geolocation page and verify geolocation functionality @heroku-app', async ({ page, homePage, geolocationPage }) => {
    const latitude = 40.7128;
    const longitude = -74.0060;

    await page.context().grantPermissions(['geolocation']);
    await page.context().setGeolocation({ latitude, longitude });

    await homePage.geolocationLink.click();
    await geolocationPage.waitForPageLoad();
    await expect(geolocationPage.header).toBeVisible();

    const location = await geolocationPage.getLocation();
    await expect(location.latitude).toMatch(latitude.toString());
    await expect(location.longitude).toMatch(longitude.toString());
});

test.afterEach(async ({ page }) => {
    await page.close();
});