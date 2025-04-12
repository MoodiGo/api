export interface IPostRequestBody<T> {
   
}
export abstract class PostRequestBody<T> {
    fromJson(json: any): T {
        throw new Error("Method not implemented.");
    }

    getSchema(): IPostRequestBodySchema{
        throw new Error("Method not implemented.");
    }
}

export interface IPostRequestBodySchema {
    type: string;
    properties: {
        [key: string]: { type: string };
    };
    required: string[];
}