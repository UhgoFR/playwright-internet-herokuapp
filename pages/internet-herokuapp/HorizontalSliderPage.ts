import {Locator,Page} from '@playwright/test'
import {BasePage} from  '../BasePage'

export class HorizontalSliderPage extends BasePage{

    readonly page:Page;
    readonly header:Locator;
    readonly slider:Locator;
    readonly sliderValue:Locator;
    
    constructor (page:Page) {
        super (page)
        this.page = page;

        this.header =page.getByRole('heading', {name:'Horizontal Slider'})
        this.slider = page.getByRole('slider');
        this.sliderValue = page.locator('#range');

    }
    
    async setSliderValue(value: number): Promise<void> {
        await this.slider.evaluate((slider, value) => {
            (slider as HTMLInputElement).value = value.toString();
            slider.dispatchEvent(new Event('input', { bubbles: true }));
            slider.dispatchEvent(new Event('change', { bubbles: true }));
        }, value);
    }

    async getSliderValue(): Promise<string> {
        return await this.sliderValue.innerText() ?? '';
    }
}
