import { Response } from 'express';
import { IRequestBodySchema } from '../../../domain/use-cases/models/IRequestBodySchema';
import { BaseError } from '../../../shared/errors/BaseError';

export abstract class ControllerBase {
    validateBodyPresence(body: any) : boolean {
        return body != null && body != undefined;
    }

    send(res: Response, statusCode: 200 | 201 | 204 | 401 | 404 | 406 | 409 | 500, message: string, data: any = null) {
        if(data){
            return res.status(statusCode).send({"message": message, data: data});
        }
        return res.status(statusCode).send({"message": message});
    }

    sendError(res: Response, error: any, defaultMessage: string) {
        if(error instanceof BaseError) {
            return res.status(error.code).send({"message": error.message});
        }
        return res.status(500).send({"message": defaultMessage, error: (error instanceof Error) ? error.message : undefined});
    }

    sendErrorInvalidBody(res: Response, expectedBodySchema: IRequestBodySchema) {
        return res.status(406).send({
            message: "Invalid request body. Expected structure:",
            expected: expectedBodySchema,
        });
    }
}