import Usergroup from "../../models/Usegroup";
import UsergroupInput from "../../models/UsergroupInput";

export interface UsergroupIRepo {
    getUsergroupById(idOrganization: string,idUsergroup: string): Promise<Usergroup>;
    findAllUsergroups(idOrganization: string): Promise<Usergroup[]>;
    saveUsergroup(idOrganization: string, usergroupInput: UsergroupInput): Promise<any[]>;
    updateUsergroup(idOrganization: string, idUsergroup: string, usergroupInput: UsergroupInput): Promise<any[]>;
    deleteUsergroup(idOrganization: string, idUsergroup: string): Promise<any>;
}