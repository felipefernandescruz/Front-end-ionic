import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import StringMask from 'string-mask';

@Directive({
  selector: '[brCurrencyMask]', // Attribute selector
  host: {
    '(keyup)': 'onInputChange($event)',
    '(blur)': 'onBlur($event)'
  }
})
export class BrCurrencyMaskDirective {

  constructor(public control:NgControl) {
  }

  ngOnInit() {
    if (this.control.value) {
       this.formatValue(this.control.value);
    }
  }

  onInputChange(event) {
    this.formatValue(event.target.value)
  }

  formatValue(valueToFormat) {
    let formattedValue;
    
    let value = valueToFormat.toFixed ? valueToFormat.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") : valueToFormat;
    value = value.toString().trim().replace(/\D+/g, '').replace(/^0+/, '').substring(0, 14);

    var formatter = value.length < 3 ? new StringMask('R$ #0,00', { reverse: true }) : new StringMask('R$ ###.###.###.###,99', { reverse: true });
    formattedValue = formatter.apply(value);

    this.control.valueAccessor.writeValue(formattedValue);    
  }

  onBlur(event: any) {
    let modelValue = event.target.value.toString().trim().replace(/[^0-9,]/g, '').replace(',', '.');
    
    if(modelValue.length > 4){
      modelValue = modelValue.replace(/^0+/, '');
    }

    this.control.viewToModelUpdate(modelValue)
  }
}