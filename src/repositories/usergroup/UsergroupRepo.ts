import db from '../../database/connection';
import HttpException from '../../error/HttpException';
import Usergroup from '../../models/Usegroup';
import UsergroupInput from '../../models/UsergroupInput';
import { OrganizationRepo } from '../organization/OrganizationRepo';
import { UsergroupIRepo } from './UsergroupIRepo';

export class UsergroupRepo implements UsergroupIRepo {

    organizationRepo: OrganizationRepo;

    constructor(organizationRepo: OrganizationRepo) {
        this.organizationRepo = organizationRepo;
    }

    async getUsergroupById(idOrganization: string, idUsergroup: string): Promise<Usergroup> {

        await this.organizationRepo.getOrganizationById(idOrganization); 

        const usergroup = await db('usergroup').select('*').where({organization_id: idOrganization, id_usergroup: idUsergroup}).catch((err) => {
            throw new Error(err.detail);
        });

        if (usergroup.length === 0) {
            throw new HttpException(404, `Cannot find usergroup with id = ${idUsergroup}`, '');
        }
        return usergroup[0];
    }

    async findAllUsergroups(idOrganization: string): Promise<Usergroup[]> {

        await this.organizationRepo.getOrganizationById(idOrganization); 
        
        const usergroups = await db('usergroup').select('*').where({organization_id: idOrganization}).catch((err) => {
            throw new Error(err.detail);
        });
        return usergroups;
    }

    async saveUsergroup(idOrganization: string, usergroupInput: UsergroupInput): Promise<any[]> {

        await this.organizationRepo.getOrganizationById(idOrganization); 
        const userGroup:any = await db('usergroup').insert({
            name: usergroupInput.name,
            class_schedule: usergroupInput.class_schedule,
            creation: new Date().toLocaleString(),
            last_update: new Date().toLocaleString(),
            organization_id: idOrganization
        }).returning('id_usergroup').then(async (id_usergroup) => {
            const usergroupInserted = await this.getUsergroupById(idOrganization, id_usergroup[0]);
            return usergroupInserted;
        }).catch((err) => {
            throw new Error(err.detail);
        });
        return userGroup;

    }

    async updateUsergroup(idOrganization: string, idUsergroup: string, usergroupInput: UsergroupInput): Promise<any> {

        await this.getUsergroupById(idOrganization, idUsergroup);

        const usergroup = await db('usergroup').where({id_usergroup: idUsergroup}).update({
            name: usergroupInput.name,
            class_schedule: usergroupInput.class_schedule,
            last_update: new Date().toLocaleString(),
        }).then(async (resp) => {
            const usergroupUpdated = await this.getUsergroupById(idOrganization, idUsergroup);
            return usergroupUpdated;
        }).catch((err) => {
            throw new Error(err.detail);
        });
        return usergroup;
    }
    
    deleteUsergroup(idOrganization: string, idUsergroup: string): Promise<any> {
        throw new Error('Method not implemented.');
    }

}