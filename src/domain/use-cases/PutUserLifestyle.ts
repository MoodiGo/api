import { PostRequestBody } from "./models/PostRequestBody";

export interface IPutUserLifestyleRequest {
    [key: string]: any;

    filter_children?: number;
    filter_pets?: number;
    filter_groups?: number;
    filter_duos?: number;
    filter_solos?: number;
    filter_accessible_places?: number;
    favorited_alcohol?: number;
    favorited_takeout?: number;
    favorited_dinein?: number;
    favorited_nightclub?: number;
    favorited_cafe?: number;
    favorited_casino?: number;
    favorited_church?: number;
    favorited_zoo_aquarium?: number;
    favorited_spa_and_beauty?: number;
    favorited_shoppingmall?: number;
    favorited_museum?: number;
    favorited_delivery?: number;
    favorited_amusement_park?: number;
    favorited_nature?: number;
    favorited_book_store?: number;    
}


export class PutUserLifestyleRequest extends PostRequestBody<PutUserLifestyleRequest> {
    filter_children?: number;
    filter_pets?: number;
    filter_groups?: number;
    filter_duos?: number;
    filter_solos?: number;
    filter_accessible_places?: number;
    favorited_alcohol?: number;
    favorited_takeout?: number;
    favorited_dinein?: number;
    favorited_nightclub?: number;
    favorited_cafe?: number;
    favorited_casino?: number;
    favorited_church?: number;
    favorited_zoo_aquarium?: number;
    favorited_spa_and_beauty?: number;
    favorited_shoppingmall?: number;
    favorited_museum?: number;
    favorited_delivery?: number;
    favorited_amusement_park?: number;
    favorited_nature?: number;
    favorited_book_store?: number;

    constructor(
        filter_children?: number,
        filter_pets?: number,
        filter_groups?: number,
        filter_duos?: number,
        filter_solos?: number,
        filter_accessible_places?: number,
        favorited_alcohol?: number,
        favorited_takeout?: number,
        favorited_dinein?: number,
        favorited_nightclub?: number,
        favorited_cafe?: number,
        favorited_casino?: number,
        favorited_church?: number,
        favorited_zoo_aquarium?: number,
        favorited_spa_and_beauty?: number,
        favorited_shoppingmall?: number,
        favorited_museum?: number,
        favorited_delivery?: number,
        favorited_amusement_park?: number,
        favorited_nature?: number,
        favorited_book_store?: number
    ) {
        super();
        this.filter_children = filter_children;
        this.filter_pets = filter_pets;
        this.filter_groups = filter_groups;
        this.filter_duos = filter_duos;
        this.filter_solos = filter_solos;
        this.filter_accessible_places = filter_accessible_places;
        this.favorited_alcohol = favorited_alcohol;
        this.favorited_takeout = favorited_takeout;
        this.favorited_dinein = favorited_dinein;
        this.favorited_nightclub = favorited_nightclub;
        this.favorited_cafe = favorited_cafe;
        this.favorited_casino = favorited_casino;
        this.favorited_church = favorited_church;
        this.favorited_zoo_aquarium = favorited_zoo_aquarium;
        this.favorited_spa_and_beauty = favorited_spa_and_beauty;
        this.favorited_shoppingmall = favorited_shoppingmall;
        this.favorited_museum = favorited_museum;
        this.favorited_delivery = favorited_delivery;
        this.favorited_amusement_park = favorited_amusement_park;
        this.favorited_nature = favorited_nature;
        this.favorited_book_store = favorited_book_store;
    }

    fromJSON(json: any): PutUserLifestyleRequest {
        return new PutUserLifestyleRequest(
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
            json.favorited_book_store
        );
    }

    getSchema(): any {
        return {
            type: "object",
            properties: {
                filter_children: { type: "number" },
                filter_pets: { type: "number" },
                filter_groups: { type: "number" },
                filter_duos: { type: "number" },
                filter_solos: { type: "number" },
                filter_accessible_places: { type: "number" },
                favorited_alcohol: { type: "number" },
                favorited_takeout: { type: "number" },
                favorited_dinein: { type: "number" },
                favorited_nightclub: { type: "number" },
                favorited_cafe: { type: "number" },
                favorited_casino: { type: "number" },
                favorited_church: { type: "number" },
                favorited_zoo_aquarium: { type: "number" },
                favorited_spa_and_beauty: { type: "number" },
                favorited_shoppingmall: { type: "number" },
                favorited_museum: { type: "number" },
                favorited_delivery: { type: "number" },
                favorited_amusement_park: { type: "number" },
                favorited_nature: { type: "number" },
                favorited_book_store: { type: "number" }
            },
            required: []
        };
    }
        
}