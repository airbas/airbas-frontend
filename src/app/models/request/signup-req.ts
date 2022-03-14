export class SignupReq {
  email: string;
  password: string;
  firstname: string;
  secondname: string;
  birthdate: string;
  creditcard: string;
  telephone: string;

  constructor(email: string,
              password: string,
              firstname: string,
              secondname: string,
              birthdate: string,
              creditcard: string,
              telephone: string) {
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.secondname = secondname;
    this.birthdate = birthdate;
    this.creditcard = creditcard;
    this.telephone = telephone;
  }
}
