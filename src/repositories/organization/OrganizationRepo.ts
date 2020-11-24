import db from "../../database/connection";
import Organization from "../../models/Organization";
import { OrganizationIRepo } from "./OrganizationIRepo";

export class OrganizationRepo implements OrganizationIRepo {

    async getOrganizationById(idOrganization: string): Promise<Organization> {
        const organization = await db('organization').select('*').where({ id_organization: idOrganization }).catch((err) => {
            throw new Error(err.detail);
        });
        return organization[0];
    }

    async findAllOrganizations(): Promise<Organization[]> {
        const organizations = await db('organization').select('*').catch((err) => {
            throw new Error(err.detail);
        });
        return organizations;
    }

    exists(t: Organization): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    delete(id: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async save(t: Organization): Promise<any> {

        const organization = await db('organization').insert({
            logo: t.logo,
            email: t.email,
            name: t.name,
            creation: new Date().toLocaleString(),
            last_update: new Date().toLocaleString()
        }).then((resp) => {
            return resp;
        }).catch((err) => {
            throw new Error(err.detail);
        });

        return organization;
    }

    update(t: Organization, id: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

}