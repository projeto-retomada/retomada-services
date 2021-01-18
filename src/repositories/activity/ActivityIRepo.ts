import Activity from "../../models/Activity";

export interface ActivityIRepo extends Repo<Activity> {
    getActivities(condition: any) : Promise<Activity[]>;
    delete(id: number): Promise<Activity>;
    save(t: Activity): Promise<Activity>;
    update(t: Activity, id: number): Promise<Activity>;
}