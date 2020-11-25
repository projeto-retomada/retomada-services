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

    async delete(id: any): Promise<any> {
        const organization = await db('organization').select('*').where({id_organization: id}).del().catch((err) => {
            throw new Error(err.detail);
        });
        return organization;
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

    async update(t: Organization, id: any): Promise<any> {
        const organization = await db('organization').where({id_organization: id}).update({
            logo: t.logo,
            email: t.email,
            name: t.name,
            last_update: new Date().toLocaleString()
        }).then(async (resp) => {
            const organizations = await db('organization').select('*').where({ id_organization: id }).catch((err) => {
                throw new Error(err.detail);
            });
            return organizations[0];
        }).catch((err) => {
            throw new Error(err.detail);
        });
    }

}