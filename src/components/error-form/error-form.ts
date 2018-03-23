import { Component, Input } from '@angular/core';

/**
 * Generated class for the ErrorFormComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'error-form',
  templateUrl: 'error-form.html'
})
export class ErrorFormComponent {

  @Input() errors: any;

  constructor() {
  }

  isRequiredError() {
    return this.errors && this.errors.required;
  }

  isEmailError() {
    return this.errors && this.errors.email;
  }

  isEmailNotMatch() {
    return this.errors && this.errors.emailNotMatch;
  }

  isPasswordNotMatch() {
    return this.errors && this.errors.passwordNotMatch;
  }

  isMinError() {
    return this.errors && this.errors.min;
  }

  isBrPhoneError() {
    return this.errors && this.errors.brPhoneMask;
  }

  getMinValue() {
    let minValue = this.errors && this.errors.requiredValue ? this.errors.requiredValue : 0;
    return Math.round(minValue);
  }

}
