import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { User } from "../models/user";

export class UserService {
    constructor(
      private readonly docClient: DocumentClient,
      private readonly tableName: string
    ) {}
  
    async getAllUsers(): Promise<User[]> {
      const result = await this.docClient
        .scan({
          TableName: this.tableName,
        })
        .promise();
  
      return result.Items as User[];
    }
  
    async getUser(userId: string): Promise<User> {
      const result = await this.docClient
        .get({
          TableName: this.tableName,
          Key: { userId },
        })
        .promise();
  
      return result.Item as User;
    }
  
    async createUser(user: User): Promise<User> {
      await this.docClient
        .put({
          TableName: this.tableName,
          Item: user,
        })
        .promise();
  
      return user;
    }
  
  
  }
  