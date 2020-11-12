export interface Mapper<T> {
    toPersistence(t: T):any;
    toDTO(t: T):any;
}