import conf from "../conf";
import { Client, Account, ID } from "appwrite";
export class AuthServices {
  client = new Client();
  account;
  //constructor
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  //create account method
  async createAccount({ email, password, name }) {
    try {
      const newAcount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (newAcount) {
        return this.loginAccount(email, password);
      } else {
        return newAcount;
      }
    } catch (e) {
      console.error("Error creating account", e);
    }

    return null;
  }

  //Login account
  async loginAccount({ email, password }) {
    try {
      return this.account.createEmailSession(email, password);
    } catch (e) {
      console.error("Error logging  account", e);
    }

    return null;
  }

  //get current user
  async getCurrentUser() {
    try {
      return this.account.get();
    } catch (e) {
      console.error("Error getting current user");
    }
    return null;
  }
  //logout
  async logoutAccount() {
    try {
      return this.account.deleteSessions();
    } catch (e) {
      console.error("Error logging out Account", e);
    }
    return null;
  }
}

export const authServices = new AuthServices();
