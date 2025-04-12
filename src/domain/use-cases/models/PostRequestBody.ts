import { IRequestBodySchema } from "./IRequestBodySchema";

export abstract class PostRequestBody<T> {
    static fromJson(json: any): PostRequestBody<any> {
        throw new Error("Method not implemented.");
    }

    static getSchema(): IRequestBodySchema {
        throw new Error("Method not implemented.");
    }

    static validate(json: any): boolean {
        throw new Error("Method not implemented.");
    }

}
