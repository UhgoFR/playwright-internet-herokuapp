import { test as base } from '@playwright/test';
import { mkdtempSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import {
  HomePage,
  ChallenginDomPage,
  CheckBoxesPage,
  ContextMenuPage,
  DragAndDropPage,
  DropDownPage,
  EntryAddPage,
  FileDownloaderPage,
  FileUploaderPage,
  FloatingMenuPage,
  FramesPage,
  NestedFramesPage,
  iFramePage,
  HorizontalSliderPage,
  HoversPage,
  InputsPage,
  JavaScriptAlertsPage,
  JQueryUIPage,
  KeyPressesPage,
  MultipleWindowsPage,
  NotificationMessagePage,
  RedirectionPage,
  StatusCodesPage,
  BasicAuthPage,
  DigestAuthPage,
  ShadowDomPage,
  SlowResourcesPage,
  GeolocationPage,
  DataTablePage,
} from '../pages/internet-herokuapp';

type HerokuappFixtures = {
  homePage: HomePage;
  challenginDomPage: ChallenginDomPage;
  checkBoxesPage: CheckBoxesPage;
  contextMenuPage: ContextMenuPage;
  dragAndDropPage: DragAndDropPage;
  dropDownPage: DropDownPage;
  entryAddPage: EntryAddPage;
  fileDownloaderPage: FileDownloaderPage;
  fileUploaderPage: FileUploaderPage;
  floatingMenuPage: FloatingMenuPage;
  framesPage: FramesPage;
  nestedFramesPage: NestedFramesPage;
  iframePage: iFramePage;
  horizontalSliderPage: HorizontalSliderPage;
  hoversPage: HoversPage;
  inputsPage: InputsPage;
  javaScriptAlertsPage: JavaScriptAlertsPage;
  jqueryUIPage: JQueryUIPage;
  keyPressesPage: KeyPressesPage;
  multipleWindowsPage: MultipleWindowsPage;
  notificationMessagePage: NotificationMessagePage;
  redirectionPage: RedirectionPage;
  statusCodesPage: StatusCodesPage;
  basicAuthPage: BasicAuthPage;
  digestAuthPage: DigestAuthPage;
  shadowDomPage: ShadowDomPage;
  slowResourcesPage: SlowResourcesPage;
  geolocationPage: GeolocationPage;
  dataTablePage: DataTablePage;
  tmpDir: string;
};

export const test = base.extend<HerokuappFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto(process.env.BASE_URL ?? '');
    await homePage.waitForPageLoad();
    await use(homePage);
  },
  challenginDomPage: async ({ page }, use) => {
    await use(new ChallenginDomPage(page));
  },
  checkBoxesPage: async ({ page }, use) => {
    await use(new CheckBoxesPage(page));
  },
  contextMenuPage: async ({ page }, use) => {
    await use(new ContextMenuPage(page));
  },
  dragAndDropPage: async ({ page }, use) => {
    await use(new DragAndDropPage(page));
  },
  dropDownPage: async ({ page }, use) => {
    await use(new DropDownPage(page));
  },
  entryAddPage: async ({ page }, use) => {
    await use(new EntryAddPage(page));
  },
  fileDownloaderPage: async ({ page }, use) => {
    await use(new FileDownloaderPage(page));
  },
  fileUploaderPage: async ({ page }, use) => {
    await use(new FileUploaderPage(page));
  },
  floatingMenuPage: async ({ page }, use) => {
    await use(new FloatingMenuPage(page));
  },
  framesPage: async ({ page }, use) => {
    await use(new FramesPage(page));
  },
  nestedFramesPage: async ({ page }, use) => {
    await use(new NestedFramesPage(page));
  },
  iframePage: async ({ page }, use) => {
    await use(new iFramePage(page));
  },
  horizontalSliderPage: async ({ page }, use) => {
    await use(new HorizontalSliderPage(page));
  },
  hoversPage: async ({ page }, use) => {
    await use(new HoversPage(page));
  },
  inputsPage: async ({ page }, use) => {
    await use(new InputsPage(page));
  },
  javaScriptAlertsPage: async ({ page }, use) => {
    await use(new JavaScriptAlertsPage(page));
  },
  jqueryUIPage: async ({ page }, use) => {
    await use(new JQueryUIPage(page));
  },
  keyPressesPage: async ({ page }, use) => {
    await use(new KeyPressesPage(page));
  },
  multipleWindowsPage: async ({ page }, use) => {
    await use(new MultipleWindowsPage(page));
  },
  notificationMessagePage: async ({ page }, use) => {
    await use(new NotificationMessagePage(page));
  },
  redirectionPage: async ({ page }, use) => {
    await use(new RedirectionPage(page));
  },
  statusCodesPage: async ({ page }, use) => {
    await use(new StatusCodesPage(page));
  },
  basicAuthPage: async ({ page }, use) => {
    await use(new BasicAuthPage(page));
  },
  digestAuthPage: async ({ page }, use) => {
    await use(new DigestAuthPage(page));
  },
  shadowDomPage: async ({ page }, use) => {
    await use(new ShadowDomPage(page));
  },
  slowResourcesPage: async ({ page }, use) => {
    await use(new SlowResourcesPage(page));
  },
  geolocationPage: async ({ page }, use) => {
    await use(new GeolocationPage(page));
  },
  dataTablePage: async ({ page }, use) => {
    await use(new DataTablePage(page));
  },
  tmpDir: async ({}, use) => {
    const tmpDirPath = mkdtempSync(join(tmpdir(), 'playwright-'));
    await use(tmpDirPath);
  },
});

export { expect } from '@playwright/test';
