import { UserType } from './../enums/user-type.enum';
import { BrStates } from "../enums/br-states.enum";



export class EnumHelper {

    constructor() {
    }

    public BrStates() {
        return BrStates;
    }

    public UserType() {
        return UserType;
    }
}