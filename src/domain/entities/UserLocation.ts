export class UserLocation {
    constructor(
        public readonly id: string,
        public readonly user_id: string,
        public readonly google_location_id: string,
        public readonly times_chosen: number,

        public readonly created_at: Date,
        public readonly updated_at: Date,
        
        public readonly self_declared: boolean
    ) {}
}