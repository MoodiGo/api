export class UserLifestyle {
    constructor(
        public id: string,
        
        public userId: string,
    

        public readonly filter_children: number,
        public readonly filter_pets: number,
        public readonly filter_groups: number,
        public readonly filter_duos: number,
        public readonly filter_solos: number,
        public readonly filter_accessible_places: number,

        public readonly favorited_alcohol: number,
        public readonly favorited_takeout: number,
        public readonly favorited_dinein: number,
        public readonly favorited_nightclub: number,
        public readonly favorited_cafe: number,
        public readonly favorited_casino: number,
        public readonly favorited_church: number,
        public readonly favorited_zoo_aquarium: number,
        public readonly favorited_spa_and_beauty: number,
        public readonly favorited_shoppingmall: number,
        public readonly favorited_museum: number,
        public readonly favorited_delivery: number,
        public readonly favorited_amusement_park: number,
        public readonly favorited_nature: number,
        public readonly favorited_book_store: number,

        
        public readonly createdAt: Date,
        public readonly updatedAt: Date,

        public readonly most_used_user_location_id: string,
    ) {}
    
    static fromJson(json: any): UserLifestyle {
        return new UserLifestyle(
            json.id,
            json.userId,
            json.filter_children,
            json.filter_pets,
            json.filter_groups,
            json.filter_duos,
            json.filter_solos,
            json.filter_accessible_places,

            json.favorited_alcohol,
            json.favorited_takeout,
            json.favorited_dinein,
            json.favorited_nightclub,
            json.favorited_cafe,
            json.favorited_casino,
            json.favorited_church,
            json.favorited_zoo_aquarium,
            json.favorited_spa_and_beauty,
            json.favorited_shoppingmall,
            json.favorited_museum,
            json.favorited_delivery,
            json.favorited_amusement_park,
            json.favorited_nature,
            json.favorited_book_store,   
            new Date(Date.parse(json.created_at)),
            new Date(Date.parse(json.updatedAt)),
            json.most_used_user_location_id
        )
    }
}