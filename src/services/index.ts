import {createDynamoDBClient} from "../database/db";
import {UserService} from "./user.service";

const { USERS_TABLE } = process.env;

const userService = new UserService(createDynamoDBClient(), USERS_TABLE);

export{ userService};