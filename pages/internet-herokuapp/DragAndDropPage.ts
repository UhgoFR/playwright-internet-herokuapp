import {Locator,Page} from "@playwright/test";
import { BasePage } from "../BasePage";

export class DragAndDropPage extends BasePage {
    readonly page: Page;

    readonly header: Locator;
    readonly columnA: Locator;
    readonly columnB: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.header = page.getByRole('heading', { name: 'Drag and Drop' });
        this.columnA = page.locator('#column-a');
        this.columnB = page.locator('#column-b');
    }

    async dragAToB() {
        await this.columnA.dragTo(this.columnB);
    }

    async dragBToA() {
        await this.columnB.dragTo(this.columnA);
    }       

    async dragManually(source: Locator, target: Locator) {
        const sourceBox = await source.boundingBox();
        const targetBox = await target.boundingBox();

        if (sourceBox && targetBox) {
            await this.page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
            await this.page.mouse.down();
            await this.page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2);
            await this.page.mouse.up();
        } else {
            throw new Error('No se pudo obtener el bounding box de los elementos.');
        }
    }
}