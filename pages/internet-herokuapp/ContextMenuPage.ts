import {Locator, Page, Dialog } from "@playwright/test";
import { BasePage } from "../BasePage";

export class ContextMenuPage extends BasePage {
    readonly page: Page;

    readonly header:Locator;
    readonly contextMenuArea: Locator;

    constructor (page:Page){
        super(page);
        this.page =page;

        this.header = page.getByRole('heading', { name: 'Context Menu' });
        this.contextMenuArea = page.locator('#hot-spot');
    }

    async rightClickHotSpot() {
        // Definimos el listener antes de la acción
        this.page.once('dialog', dialog => dialog.accept()); 
        // Usamos .once para que solo actúe sobre este diálogo específico
        await this.contextMenuArea.click({ button: 'right' });
    }

    async triggerContextMenuWithOnce(): Promise<Dialog> {
        // Usamos .once para que solo actúe sobre este diálogo específico
        const dialogPromise = new Promise<Dialog>(resolve => {
            this.page.once('dialog', dialog => {
                dialog.accept();
                resolve(dialog);
            });
        });
        await this.contextMenuArea.click({ button: 'right' });
        return dialogPromise;
    }

}