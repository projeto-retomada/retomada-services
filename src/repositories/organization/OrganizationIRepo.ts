import Organization from "../../models/Organization";

export interface OrganizationIRepo extends Repo<Organization> {
    getOrganizationById(idOrganization: string): Promise<Organization>;
    findAllOrganizations(): Promise<Organization[]>;
}