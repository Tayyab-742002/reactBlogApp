import conf from "../conf";
import { Client, Databases, Query, ID } from "appwrite";
export class Service {
  client;
  databases;
  bucket;

  constructor() {
    this.client = new Client();
    this.databases = new Databases(client);
    this.bucket = new Storage(client);
  }

  //create Post method

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (e) {
      console.error("Error creating post", e);
    }
  }

  //update Post method
  async updatePost(slug, { title, content, status, featuredImage }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (e) {
      console.error("Error updating post", e);
    }
  }

  //delete document
  async deleteDocument(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (e) {
      console.error("Error deleting document", e);
    }
  }
  //Get a single document
  async getPost(slug) {
    try {
      return await this.databases.getDocument(slug);
    } catch (e) {
      console.error("Error getting a Document");
    }
  }

  //get all Documents

  async getPosts(queries = [Query.equal("title", ["Iron Man"])]) {
    try {
      return await this.databases.getDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (e) {
      console.error("Error getting all Documents");
    }
  }

  //file upload service
  async fileUpload(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (e) {
      console.error("Error uploading file", e);
    }
  }
  //file delete sevice

  async fileDelete(fileId) {
    // this will return true or false depending on the file deletion
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (e) {
      console.error("Error deleting file");
    }
    return false;
  }

  //get file preview service
  async filePreview(fileId) {
    try {
      return await this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (e) {
      console.error("Error getting file preview", e);
    }
  }
}

export const databaseObj = -new Service();
