export interface Mapper<T, I>{
    toDTO(t: T): any;
    toPersistence(i: I):T;
}