export class UserWeather {
    constructor(
        public readonly created_at: Date,
        public readonly user_id: string,
        public readonly weather_id: string,
        public readonly times_chosen: number,
        public readonly self_declared: boolean,

        public readonly id?: string
    ) {}
}