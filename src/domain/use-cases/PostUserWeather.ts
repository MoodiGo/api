import { PostRequestBody } from "./models/PostRequestBody";

export class PostUserWeatherRequest extends PostRequestBody<PostUserWeatherRequest> {
    constructor(
        public readonly weather_id: string,
        public readonly times_chosen: number,
        public readonly self_declared: boolean
    ) {
        super();
    }

    static fromJson(json: any): PostUserWeatherRequest {
        return new PostUserWeatherRequest(
            json.weather_id,
            json.times_chosen,
            json.self_declared
        );
    }

    static getSchema(): any {
        return {
            type: "object",
            properties: {
                weather_id: { type: "string" },
                times_chosen: { type: "number" },
                self_declared: { type: "boolean" },
            },
            required: ["weather_id", "times_chosen", "self_declared"],
        };
    }

    static validate(json: any): boolean {
        try {
            return this.fromJson(json) instanceof PostUserWeatherRequest;
        } catch (error) {
            return false;            
        }
    }
}