export class PlaceType {
    
    public static readonly PrivatePlace = new PlaceType(1, "PRIVADO");
    public static readonly CommercialPlace = new PlaceType(2, "COMERCIAL");
    public static readonly PublicPlace = new PlaceType(3, "PUBLICO");
    
    public Id: number;
    public Name: string;

    constructor(id: number, name: string) {
        this.Id = id;
        this.Name = name;
    }

    public static List() {
        return [
            this.PrivatePlace, this.CommercialPlace, this.PublicPlace
        ];
    }
}