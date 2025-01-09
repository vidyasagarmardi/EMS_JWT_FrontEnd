export class Employee {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;

    constructor(
        id: number,
        firstName: string,
        middleName: string,
        lastName: string,
        email: string,
        address: string,
        phone: string
    ){
        this.id = id;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.phone = phone;
    }
}
