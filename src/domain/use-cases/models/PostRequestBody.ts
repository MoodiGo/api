export abstract class PostRequestBody<T> {
    static fromJson(json: any): PostRequestBody<any> {
        throw new Error("Method not implemented.");
    }

    static getSchema(): IPostRequestBodySchema {
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