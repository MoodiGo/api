export class Weather {
    constructor(
        public readonly name: string,
        public readonly id?: number,
    ){}

    public static create(name: string): Weather {
        return new Weather(name);
    }
}