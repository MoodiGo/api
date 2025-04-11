export class Favorite {
    constructor(
        public readonly google_place_id: string,
        public readonly user_id: string,

        public readonly filter_vibe_id: number,
        public readonly filter_weather_id: number,
        public readonly filter_child_friendly: boolean,
        public readonly filter_pet_friendly: boolean,
        public readonly filter_amount_people: number,
        public readonly filter_google_location_id: number,
        public readonly filter_best_period: string,
        public readonly filter_accessible: boolean,

        public readonly created_at: Date,
        public readonly times_chosen: number,
        public readonly self_declared: boolean,

        public readonly id: string
    ) {}
}