import { PostRequestBody } from "./models/PostRequestBody";

export class PostUserVibeRequest extends PostRequestBody<PostUserVibeRequest> {
    constructor(
        public readonly vibe_id: string,
        public readonly times_chosen: number,
        public readonly self_declared: boolean
    ) {
        super();
    }

    static fromJson(json: any): PostUserVibeRequest {
        return new PostUserVibeRequest(
            json.vibe_id,
            json.times_chosen,
            json.self_declared
        );
    }

    static getSchema(): any {
        return {
            type: "object",
            properties: {
                vibe_id: { type: "string" },
                times_chosen: { type: "number" },
                self_declared: { type: "boolean" },
            },
            required: ["weather_id", "times_chosen", "self_declared"],
        };
    }

    static validate(json: any): boolean {
        try {
            return this.fromJson(json) instanceof PostUserVibeRequest;
        } catch (error) {
            return false;            
        }
    }
}