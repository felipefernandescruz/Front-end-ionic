import { NgModule } from '@angular/core';
import { BrPhoneMaskDirective } from './br-phone-mask/br-phone-mask';
import { BrCurrencyMaskDirective } from './br-currency-mask/br-currency-mask';
import { ParallaxDirective } from './parallax/parallax';
import { ElasticTextAreaDirective } from './elastic-text-area/elastic-text-area';
@NgModule({
	declarations: [BrPhoneMaskDirective,
    BrCurrencyMaskDirective,
    ParallaxDirective,
    ElasticTextAreaDirective],
	imports: [],
	exports: [BrPhoneMaskDirective,
    BrCurrencyMaskDirective,
    ParallaxDirective,
    ElasticTextAreaDirective]
})
export class DirectivesModule {}
