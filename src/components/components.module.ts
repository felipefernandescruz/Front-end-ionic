import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ErrorFormComponent } from './error-form/error-form';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [ErrorFormComponent],
	imports: [
		TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
	],
	exports: [ErrorFormComponent]
})
export class ComponentsModule {}
