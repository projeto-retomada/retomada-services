interface Repo<T> {
    exists(t: T): Promise<boolean>;
    delete(id: any): Promise<any>;
    save(t: T): Promise<any>;
    update(t: T, id: any): Promise<any>;
}