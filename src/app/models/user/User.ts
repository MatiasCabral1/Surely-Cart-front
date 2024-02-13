export class User {
  username: string;
  documentNumber: string;
  password: string;

  constructor(username: string, documentNumber: string, password: string) {
    this.username = username;
    this.documentNumber = documentNumber;
    this.password = password;
  }
}
