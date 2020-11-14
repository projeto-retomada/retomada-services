export interface Mapper<T, I, A>{
    toDTO(t: T):A;
    toPersistence(i: I):T;
}