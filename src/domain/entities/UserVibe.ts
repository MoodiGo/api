export class UserViber {
    constructor(
        public readonly id: string,
        public readonly created_at: Date,
        public readonly user_id: string,
        public readonly vibe_id: string,
        public readonly times_chosen: number,
        public readonly self_declared: boolean
    ) {}
}