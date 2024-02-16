import conf from "../conf";
import { Client, Account, ID } from "appwrite";
export class AuthServices {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }
}

export const authServices = new AuthServices();
