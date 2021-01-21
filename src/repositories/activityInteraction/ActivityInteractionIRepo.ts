import Activity from "../../models/Activity";
import ActivityInteracion from "../../models/ActivityInteraction";

export interface ActivityInteractionIRepo extends Repo<ActivityInteracion> {
    getActivitiesInteractions(condition: any): Promise<ActivityInteracion[]>;
    delete(id: number): Promise<ActivityInteracion>;
    save(t: ActivityInteracion): Promise<ActivityInteracion>;
    update(t: ActivityInteracion, id: number): Promise<ActivityInteracion>;
}