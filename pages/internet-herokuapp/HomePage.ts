import { BasePage } from "../BasePage";
import {Page, Locator} from '@playwright/test';

export class HomePage extends BasePage {

    readonly page: Page;

    //locatos
    readonly header: Locator;
    readonly ABTesting_link: Locator;
    readonly availableExamplesHeader: Locator;
    readonly addRemoveElementsLink: Locator;
    readonly basicAuthLink: Locator;
    readonly brokenImagesLink: Locator;
    readonly challengingDomLink: Locator;
    readonly checkboxesLink: Locator;
    readonly contextMenuLink: Locator;
    readonly digestAuthenticationLink: Locator;
    readonly disappearingElementsLink: Locator;
    readonly dragAndDropLink: Locator;
    readonly dropdownLink: Locator;
    readonly dynamicContentLink: Locator;
    readonly dynamicControlsLink: Locator;
    readonly dynamicLoadingLink: Locator;
    readonly entryAdLink: Locator;
    readonly exitIntentLink: Locator;
    readonly fileDownloadLink: Locator;
    readonly fileUploadLink: Locator;
    readonly floatingMenuLink: Locator;
    readonly forgotPasswordLink: Locator;
    readonly formAuthenticationLink: Locator;
    readonly framesLink: Locator;
    readonly geolocationLink: Locator;
    readonly horizontalSliderLink: Locator;
    readonly hoversLink: Locator;
    readonly infiniteScrollLink: Locator;
    readonly inputsLink: Locator;
    readonly jqueryUiMenusLink: Locator;
    readonly javascriptAlertsLink: Locator;
    readonly javascriptOnloadEventErrorLink: Locator;
    readonly keyPressesLink: Locator;
    readonly largeDeepDomLink: Locator;
    readonly multipleWindowsLink: Locator;
    readonly nestedFramesLink: Locator;
    readonly notificationMessagesLink: Locator;
    readonly redirectLinkLink: Locator;
    readonly secureFileDownloadLink: Locator;
    readonly shadowDomLink: Locator;
    readonly shiftingContentLink: Locator;
    readonly slowResourcesLink: Locator;
    readonly sortableDataTablesLink: Locator;
    readonly statusCodesLink: Locator;
    readonly typosLink: Locator;
    readonly wysiwygEditorLink: Locator;
    readonly forkMeOnGitHubLink: Locator;
    readonly elementalSeleniumLink: Locator;
    

    constructor(page: Page) {
        super(page);
        this.page = page;

        // Inicializar locators
        this.header = page.getByRole('heading', { name: 'Welcome to the-internet' });
        this.ABTesting_link = page.getByRole('link', { name: 'A/B Testing' });
        this.availableExamplesHeader = page.getByRole('heading', { name: 'Available Examples' });
        this.addRemoveElementsLink = page.getByRole('link', { name: 'Add/Remove Elements' });
        this.basicAuthLink = page.getByRole('link', { name: 'Basic Auth' });
        this.brokenImagesLink = page.getByRole('link', { name: 'Broken Images' });
        this.challengingDomLink = page.getByRole('link', { name: 'Challenging DOM' });
        this.checkboxesLink = page.getByRole('link', { name: 'Checkboxes' });
        this.contextMenuLink = page.getByRole('link', { name: 'Context Menu' });
        this.digestAuthenticationLink = page.getByRole('link', { name: 'Digest Authentication' });
        this.disappearingElementsLink = page.getByRole('link', { name: 'Disappearing Elements' });
        this.dragAndDropLink = page.getByRole('link', { name: 'Drag and Drop' });
        this.dropdownLink = page.getByRole('link', { name: 'Dropdown' });
        this.dynamicContentLink = page.getByRole('link', { name: 'Dynamic Content' });
        this.dynamicControlsLink = page.getByRole('link', { name: 'Dynamic Controls' });
        this.dynamicLoadingLink = page.getByRole('link', { name: 'Dynamic Loading' });
        this.entryAdLink = page.getByRole('link', { name: 'Entry Ad' });
        this.exitIntentLink = page.getByRole('link', { name: 'Exit Intent' });
        this.fileDownloadLink = page.getByRole('link', { name: 'File Download', exact: true });
        this.fileUploadLink = page.getByRole('link', { name: 'File Upload' });
        this.floatingMenuLink = page.getByRole('link', { name: 'Floating Menu' });
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot Password' });
        this.formAuthenticationLink = page.getByRole('link', { name: 'Form Authentication' });
        this.framesLink = page.getByRole('link', { name: 'Frames', exact: true });
        this.geolocationLink = page.getByRole('link', { name: 'Geolocation' });
        this.horizontalSliderLink = page.getByRole('link', { name: 'Horizontal Slider' });
        this.hoversLink = page.getByRole('link', { name: 'Hovers' });
        this.infiniteScrollLink = page.getByRole('link', { name: 'Infinite Scroll' });
        this.inputsLink = page.getByRole('link', { name: 'Inputs' });
        this.jqueryUiMenusLink = page.getByRole('link', { name: 'JQuery UI Menus' });
        this.javascriptAlertsLink = page.getByRole('link', { name: 'JavaScript Alerts' });
        this.javascriptOnloadEventErrorLink = page.getByRole('link', { name: 'JavaScript onload event error' });
        this.keyPressesLink = page.getByRole('link', { name: 'Key Presses' });
        this.largeDeepDomLink = page.getByRole('link', { name: 'Large & Deep DOM' });
        this.multipleWindowsLink = page.getByRole('link', { name: 'Multiple Windows' });
        this.nestedFramesLink = page.getByRole('link', { name: 'Nested Frames' });
        this.notificationMessagesLink = page.getByRole('link', { name: 'Notification Messages' });
        this.redirectLinkLink = page.getByRole('link', { name: 'Redirect Link' });
        this.secureFileDownloadLink = page.getByRole('link', { name: 'Secure File Download' });
        this.shadowDomLink = page.getByRole('link', { name: 'Shadow DOM' });
        this.shiftingContentLink = page.getByRole('link', { name: 'Shifting Content' });
        this.slowResourcesLink = page.getByRole('link', { name: 'Slow Resources' });
        this.sortableDataTablesLink = page.getByRole('link', { name: 'Sortable Data Tables' });
        this.statusCodesLink = page.getByRole('link', { name: 'Status Codes' });
        this.typosLink = page.getByRole('link', { name: 'Typos' });
        this.wysiwygEditorLink = page.getByRole('link', { name: 'WYSIWYG Editor' });
        this.forkMeOnGitHubLink = page.getByRole('link', { name: 'Fork me on GitHub' });
        this.elementalSeleniumLink = page.getByRole('link', { name: 'Elemental Selenium' });
    }


}   