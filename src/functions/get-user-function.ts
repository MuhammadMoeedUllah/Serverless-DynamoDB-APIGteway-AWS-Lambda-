import {
    APIGatewayEvent,
    Handler,
    Context,
    APIGatewayProxyResult,
  } from "aws-lambda";
  import {middify} from "../core/middelware";
  import {formatJSONResponse} from "../core/jsonFormatter";
  import {userService} from "../services";
  
  export const handler: Handler = middify(
    async (
      event: APIGatewayEvent,
      _context: Context
    ): Promise<APIGatewayProxyResult> => {
      const userId: string = event.pathParameters.userId;
      try {
        const users = await userService.getUser(userId);
  
        return formatJSONResponse(200, users);
      } catch (err) {
        return formatJSONResponse(400, err);
      }
    }
  );