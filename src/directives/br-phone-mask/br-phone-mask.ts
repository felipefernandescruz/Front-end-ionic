import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS, NgControl } from '@angular/forms';
import StringMask from 'string-mask';

@Directive({
    selector: '[brPhoneMask]', // Attribute selector
    host: {
        '(keyup)': 'onInputChange($event)',
        '(blur)': 'onBlur($event)'
    },
    providers: [{ provide: NG_VALIDATORS, useFactory: BrPhoneMaskDirective.ValidateField, multi: true }]
})
export class BrPhoneMaskDirective {

    static ValidateField() {
        return (c: FormControl) => {
            return c.value && c.value.length < 9 ? { brPhoneMask: true } : null;
        }
    }

    isRunDoCheck: boolean = true;
    masks = {
        phoneMask8D: {
            areaCode: new StringMask('(00) 0000-0000'),
            simple: new StringMask('0000-0000')
        },
        phoneMask9D: {
            areaCode: new StringMask('(00) 00000-0000'),
            simple: new StringMask('00000-0000')
        },
        phoneMask0800: {
            areaCode: null,
            simple: new StringMask('0000-000-0000')
        }
    }

    constructor(public control: NgControl) {
    }

    ngOnInit() {
        if (this.control.value) {
            this.formatValue(this.control.value);
        }
    }

    ngDoCheck() {
        if (this.control.value && this.isRunDoCheck) {
            this.isRunDoCheck = false;
            this.formatValue(this.control.value);
        }
    }

    onInputChange(event) {
        this.formatValue(event.target.value)
    }

    formatValue(valueToFormat) {

        let formattedValue;
        let value = valueToFormat.trim().replace(/\D+/g, '').substring(0, 11);

        if (value.indexOf('0800') === 0) {
            formattedValue = this.masks.phoneMask0800.simple.apply(value);
        } else if (value.length == 8) {
            formattedValue = this.masks.phoneMask8D.simple.apply(value) || '';
        } else if (value.length == 9 ) {
            formattedValue = this.masks.phoneMask9D.simple.apply(value);
        } else if (value.length == 10) {
            formattedValue = this.masks.phoneMask8D.areaCode.apply(value);
        } else if( value.length > 10)  {
            formattedValue = this.masks.phoneMask9D.areaCode.apply(value);
        }

        this.control.valueAccessor.writeValue(formattedValue);
    }

    onBlur(event: any) {
        let modelValue = event.target.value.trim().replace(/\D+/g, '').substring(0, 11);

        this.control.viewToModelUpdate(modelValue)
    }

}
