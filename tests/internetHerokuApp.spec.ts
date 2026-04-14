import {test, expect} from '@playwright/test';
import { 
  HomePage, 
  ContextMenuPage, 
  ChallenginDomPage, 
  CheckBoxesPage, 
  DragAndDropPage,
  DropDownPage,
  EntryAddPage,
  FileDownloaderPage,
  FloatingMenuPage,
  FramesPage,
  NestedFramesPage,
  iFramePage,
  HorizontalSliderPage,
  HoversPage,
  JavaScriptAlertsPage,
  KeyPressesPage
} from '../pages/internet-herokuapp';


  let homePage: HomePage;
  let challenginDomPage: ChallenginDomPage;
  let contextMenuPage: ContextMenuPage;
  let checkBoxesPage: CheckBoxesPage;
  let dragAndDropPage: DragAndDropPage;
  let dropDownPage: DropDownPage;
  let entryAddPage: EntryAddPage;
  let fileDownloaderPage: FileDownloaderPage;
  let floatingMenuPage: FloatingMenuPage;
  let framesPage: FramesPage;
  let nestedFramesPage: NestedFramesPage;
  let iframePage: iFramePage;
  let horizontalSliderPage: HorizontalSliderPage;
  let hoversPage: HoversPage;
  let javaScriptAlertsPage: JavaScriptAlertsPage;
  let keyPressesPage: KeyPressesPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    challenginDomPage = new ChallenginDomPage(page);
    contextMenuPage = new ContextMenuPage(page);
    checkBoxesPage = new CheckBoxesPage(page);
    dragAndDropPage = new DragAndDropPage(page);
    dropDownPage = new DropDownPage(page);
    entryAddPage = new EntryAddPage(page);
    fileDownloaderPage = new FileDownloaderPage(page);
    floatingMenuPage = new FloatingMenuPage(page);
    framesPage = new FramesPage(page);
    nestedFramesPage = new NestedFramesPage(page);
    iframePage = new iFramePage(page);
    horizontalSliderPage = new HorizontalSliderPage(page);
    hoversPage = new HoversPage(page);
    javaScriptAlertsPage = new JavaScriptAlertsPage(page);
    keyPressesPage = new KeyPressesPage(page);
    await homePage.goto(process.env.BASE_URL ?? '');
    await homePage.waitForPageLoad();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  

test.describe('Home Page Tests', () => {


  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    contextMenuPage = new ContextMenuPage(page);
    await homePage.goto(process.env.BASE_URL ?? '');
    await homePage.waitForPageLoad();
  });

  test('should display the correct header', async () => {
    await expect(homePage.header).toBeVisible();
    await expect(homePage.header).toHaveText('Welcome to the-internet');
  });

  test('should have a link to A/B Testing', async () => {
    await expect(homePage.ABTesting_link).toBeVisible();
    await expect(homePage.ABTesting_link).toHaveAttribute('href', '/abtest');
  });

  
  test.afterEach(async ({ page }) => {
            await page.close();
});

});

test('should navigate to Challenging DOM page and see all the elements', async () => {
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

test('Should interact with checkboxes and verify their state', async () => {
    await homePage.checkboxesLink.click();
    await checkBoxesPage.waitForPageLoad();
    await expect(checkBoxesPage.header).toBeVisible();
    await expect(checkBoxesPage.checkboxOne).toBeVisible();
    await expect(checkBoxesPage.checkboxTwo).toBeVisible();

    // Verificar que ambos checkboxes estén inicialmente desmarcados
    await expect(checkBoxesPage.checkboxOne).not.toBeChecked();
    await expect(checkBoxesPage.checkboxTwo).toBeChecked();

    // Marcar ambos checkboxes
    await checkBoxesPage.checkAllCheckboxes();
    await expect(checkBoxesPage.checkboxOne).toBeChecked();
    await expect(checkBoxesPage.checkboxTwo).toBeChecked();

    // Desmarcar ambos checkboxes
    await checkBoxesPage.uncheckAllCheckboxes();
    await expect(checkBoxesPage.checkboxOne).not.toBeChecked();
    await expect(checkBoxesPage.checkboxTwo).not.toBeChecked();

    // Alternar el estado del primer checkbox
    await checkBoxesPage.toggleCheckboxOne();
    await expect(checkBoxesPage.checkboxOne).toBeChecked();
    await expect(checkBoxesPage.checkboxTwo).not.toBeChecked();

    // Alternar el estado del segundo checkbox
    await checkBoxesPage.toggleCheckboxTwo();
    await expect(checkBoxesPage.checkboxOne).toBeChecked();
    await expect(checkBoxesPage.checkboxTwo).toBeChecked();
}); 
test('debe mostrar alerta al hacer clic derecho', async ({ page }) => {
    await homePage.contextMenuLink.click();
    await contextMenuPage.waitForPageLoad();

    //await contextMenuPage.rightClickHotSpot();
    const dialog = await contextMenuPage.triggerContextMenuWithOnce();
    await expect(dialog).toBeTruthy();  
});

test('should drag and drop element A to B and then B to A', async ({ page }) => {
    await homePage.dragAndDropLink.click();
    //await page.pause();
    await dragAndDropPage.waitForPageLoad();
    await expect(dragAndDropPage.header).toBeVisible();
    await expect(dragAndDropPage.columnA).toBeVisible();
    await expect(dragAndDropPage.columnB).toBeVisible();

    // Arrastrar la columna A a la posición de la columna B
    await dragAndDropPage.dragAToB();
    // Verificar que la columna A ahora esté en la posición de la columna B
    await expect(dragAndDropPage.columnA).toHaveText('B');
    await expect(dragAndDropPage.columnB).toHaveText('A');

    // Arrastrar la columna B de vuelta a la posición de la columna A
    await dragAndDropPage.dragBToA();
    // Verificar que la columna B ahora esté en la posición de la columna A
    await expect(dragAndDropPage.columnA).toHaveText('A');
    await expect(dragAndDropPage.columnB).toHaveText('B');

    // Alternativamente, puedes usar el método manual para arrastrar y soltar
     await dragAndDropPage.dragManually(dragAndDropPage.columnA, dragAndDropPage.columnB);
     await expect(dragAndDropPage.columnA).toHaveText('B');
     await expect(dragAndDropPage.columnB).toHaveText('A'); 
}); 

test('should select an option from the dropdown and verify the selection', async ({ page }) => {
    await homePage.dropdownLink.click();
    await dropDownPage.waitForPageLoad();
    await expect(dropDownPage.header).toBeVisible();
    await expect(dropDownPage.dropdown).toBeVisible();

    // Seleccionar la opción "Option 1"
    await dropDownPage.SelectOption('Option 1');
    // Verificar que la opción seleccionada sea "Option 1"
    const selectedOption = await dropDownPage.dropdown.inputValue();
    await expect(selectedOption).toBe('1');

    // Seleccionar la opción "Option 2"
    await dropDownPage.SelectOption('Option 2');
    // Verificar que la opción seleccionada sea "Option 2"
    const selectedOption2 = await dropDownPage.dropdown.inputValue();
    await expect(selectedOption2).toBe('2');
});

test('should add a new entry and verify its content', async ({ page }) => {
    await homePage.entryAdLink.click();
    await entryAddPage.waitForPageLoad();
   
    await expect(entryAddPage.entryTitle).toBeVisible();
    // Obtener el título y contenido de la entrada
    const entryTitle = await entryAddPage.getEntryTitle();
    const entryContent = await entryAddPage.getEntryContent();

    // Verificar que el título y contenido sean los esperados
    await expect.soft(entryTitle).toBe('THIS IS A MODAL WINDOW');
    await expect.soft(entryContent).toContain("It's commonly used to encourage a user to take an action");
    await entryAddPage.closeButton.click();

     await expect(entryAddPage.header).toBeVisible();

});

test('should verify the floating menu is visible and functional', async ({ page }) => {
    await homePage.floatingMenuLink.click();
    await floatingMenuPage.waitForPageLoad();
    await expect(floatingMenuPage.header).toBeVisible();
    await expect(floatingMenuPage.floatingMenu).toBeVisible();

    // Verificar que el menú flotante esté visible
    const isMenuVisible = await floatingMenuPage.isFloatingMenuVisible();
    await expect(isMenuVisible).toBe(true);

    // Verificar que los enlaces del menú flotante sean funcionales
    await expect(floatingMenuPage.homeLink).toBeVisible();
    await expect(floatingMenuPage.newsLink).toBeVisible();
    await expect(floatingMenuPage.contactLink).toBeVisible();
    await expect(floatingMenuPage.aboutLink).toBeVisible();

    // Puedes agregar clics en los enlaces y verificar la url contiene la ruta esperada
    await floatingMenuPage.homeLink.click();
    await expect(page).toHaveURL(/^https?:\/\/.*#home$/);

    await floatingMenuPage.newsLink.click();
    await expect(page).toHaveURL(/^https?:\/\/.*#news$/);

    await floatingMenuPage.contactLink.click();
    await expect(page).toHaveURL(/^https?:\/\/.*#contact$/);

    await floatingMenuPage.aboutLink.click();
    await expect(page).toHaveURL(/^https?:\/\/.*#about$/);
});

test('should navigate to Frames page and verify nested frames content', async ({ page }) => {
    await homePage.framesLink.click();
    await framesPage.waitForPageLoad();
    await expect(framesPage.header).toBeVisible();

    // Navegar a Nested Frames
    await framesPage.nestedFramesLink.click();
    await nestedFramesPage.waitForPageLoad();

    // Verificar el texto del frame izquierdo
    const parentFrameText = await nestedFramesPage.getLeftFrameText();
    await expect(parentFrameText).toBe('LEFT');
    // Verificar el texto del frame del medio    const middleFrameText = await nestedFramesPage.getMiddleFrameText();
    const middleFrameText = await nestedFramesPage.getMiddleFrameText();
    await expect(middleFrameText).toBe('MIDDLE');
    // Verificar el texto del frame derecho
    const rightFrameText = await nestedFramesPage.getRightFrameText();
    await expect(rightFrameText).toBe('RIGHT');
    // Verificar el texto del frame inferior
    const bottomFrameText = await nestedFramesPage.getBottomFrameText();
    await expect(bottomFrameText).toBe('BOTTOM');

});

test('should navigate to iFrame page and verify the content inside the iFrame', async ({ page }) => {
    await homePage.framesLink.click();
    await framesPage.waitForPageLoad();
    await expect(framesPage.header).toBeVisible();

    // Navegar a iFrame
    await framesPage.iFrameLink.click();
    await iframePage.waitForPageLoad();

    // Cerrar el cuadro de alerta si está visible
    await iframePage.closeAlertBoxifVisible();  

    // Verificar el contenido dentro del iFrame
    const iFrameContent = await iframePage.getIFrameContent();
    await expect(iFrameContent).toBe('Your content goes here.');

});

test('should navigate to Horizontal Slider page and verify slider functionality', async ({ page }) => {
    await homePage.horizontalSliderLink.click();
    await horizontalSliderPage.waitForPageLoad();
    await expect(horizontalSliderPage.header).toBeVisible();

    // Establecer el valor del slider a 3
    await horizontalSliderPage.setSliderValue(3);
    // Verificar que el valor del slider sea 3
    const sliderValue = await horizontalSliderPage.getSliderValue();
    await expect(sliderValue).toBe('3');

    // Establecer el valor del slider a 5
    await horizontalSliderPage.setSliderValue(5);
    // Verificar que el valor del slider sea 5
    const sliderValue2 = await horizontalSliderPage.getSliderValue();
    await expect(sliderValue2).toBe('5');
});

test('should navigate to Hovers page and verify hover functionality', async ({ page }) => {
    await homePage.hoversLink.click();
    await hoversPage.waitForPageLoad();
    await expect(hoversPage.header).toBeVisible();

    // Hacer hover sobre la primera figura y verificar el nombre de usuario
    const userName1 = await hoversPage.getUserName(1);
    await expect(userName1).toBe('user1');
    await hoversPage.clickViewProfile(1);
    await expect(page).toHaveURL(/\/users\/1$/);
    await page.goBack();

    // Hacer hover sobre la segunda figura y verificar el nombre de usuario
    const userName2 = await hoversPage.getUserName(2);
    await expect(userName2).toBe('user2');
    await hoversPage.clickViewProfile(2);
    await expect(page).toHaveURL(/\/users\/2$/);
    await page.goBack();

    // Hacer hover sobre la tercera figura y verificar el nombre de usuario
    const userName3 = await hoversPage.getUserName(3);
    await expect(userName3).toBe('user3');
    await hoversPage.clickViewProfile(3);
    await expect(page).toHaveURL(/\/users\/3$/);
    await page.goBack();

});

test('should navigate to JavaScript Alerts page and verify alert functionality', async ({ page }) => {
    await homePage.javascriptAlertsLink.click();
    await javaScriptAlertsPage.waitForPageLoad();
    await expect(javaScriptAlertsPage.header).toBeVisible();

    // Interactuar con el botón de alerta simple y verificar el resultado
    await javaScriptAlertsPage.triggerAlert('alert');
    await expect(await javaScriptAlertsPage.getResultText()).toBe('You successfully clicked an alert'); 

    await javaScriptAlertsPage.triggerAlert('confirm');
    await expect(await javaScriptAlertsPage.getResultText()).toBe('You clicked: Ok');

    await javaScriptAlertsPage.triggerAlert('prompt', 'Playwright');
    await expect(await javaScriptAlertsPage.getResultText()).toBe('You entered: Playwright');

     await javaScriptAlertsPage.triggerAlert('prompt');
     await expect(await javaScriptAlertsPage.getResultText()).toBe('You entered:');

});
    
test('should navigate to Key Presses page and verify key press functionality', async ({ page }) => {
    await homePage.keyPressesLink.click();
    await keyPressesPage.waitForPageLoad();
    await expect(keyPressesPage.header).toBeVisible();

    // Presionar la tecla "A" y verificar el resultado
    await keyPressesPage.pressKey('A');
    await expect(await keyPressesPage.getResultText()).toBe('You entered: A');

    // Presionar la tecla "Enter" y verificar el resultado
    await keyPressesPage.pressKey('Backspace');
    await expect(await keyPressesPage.getResultText()).toBe('You entered: BACK_SPACE');

    // Presionar la tecla "ArrowDown" y verificar el resultado
    await keyPressesPage.pressKey('ArrowDown');
    await expect(await keyPressesPage.getResultText()).toBe('You entered: DOWN');
});