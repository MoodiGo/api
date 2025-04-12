export class User {
    /**
     *
     */
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly login_provider_id: string,

        public readonly name: string,
        public readonly last_name: string,

        public readonly is_premium: boolean,

        public readonly created_at: Date,
        public readonly updated_at: Date,
        public readonly last_login_at: Date,

        public readonly terms_accepted: boolean,
        public readonly accepted_contact: boolean,

        public readonly birthdate: Date,

        public readonly firebase_uid: string,
    ) {}
}