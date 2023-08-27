import {
    APIGatewayEvent,
    Handler,
    Context,
    APIGatewayProxyResult,
  } from "aws-lambda";
  import * as uuid from "uuid";
  import {middify} from "../core/middelware";
  import {formatJSONResponse} from "../core/jsonFormatter";
  import {userService} from "../services";

  import {CreateUser} from "../dtos/create-user.dto";
  
    export const handler: Handler = middify(
    async (
      event: APIGatewayEvent & CreateUser,
      _context: Context
    ): Promise<APIGatewayProxyResult> => {
      const { name, email } = event.body;
  
      try {
        const userId: string = uuid.v4();
        const user = await userService.createUser({
          userId,
          name,
          email,
          active: true,
          createdAt: new Date().toISOString(),
        });
  
        return formatJSONResponse(200, user);
      } catch (err) {
        return formatJSONResponse(400, err);
      }
    }
  );

