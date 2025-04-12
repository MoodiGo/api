
export interface IRequestBodySchema {
    type: string;
    properties: {
        [key: string]: { type: string };
    };
    required: string[];
}