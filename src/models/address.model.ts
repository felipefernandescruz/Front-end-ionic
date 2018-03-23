export class AddressModel {
    
        customerId: number;
        state: string;
        city: string;
        street: string;
        number: number;
        complement: string;
        neighborhood: string;
        latitude: number;
        longitude: number;
    
        constructor() {
            this.customerId = null;
            this.state = null;
            this.city = null;
            this.street = null;
            this.number = null;
            this.complement = null;
            this.neighborhood = null;
            this.latitude = null;
            this.longitude = null;
        }
    }
    