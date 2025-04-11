export class Vibe {
    constructor(
        public readonly name: string,
        public readonly id?: number,
    ){}

    public static create(name: string): Vibe {
        return new Vibe(name);
    }
}