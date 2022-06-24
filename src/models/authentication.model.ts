class AuthenticationModel {
  email: string;
  password: string;

  constructor(values: AuthenticationModel) {
    this.email = values?.email || ``;
    this.password = values?.password || ``;
  }
}

export default AuthenticationModel;
