import moment from 'moment';
import Organization from '../models/Organization';
import OrganizationInput from '../models/OrganizationInput';
import { Mapper } from './Mapper';

export class OrganizationMapper implements Mapper<Organization, OrganizationInput> {
    
    toDTO(t: Organization): any{
        const organizationModel  = {
            id_organization: t.id_organization,
            logo: t.logo,
            email: t.email,
            name: t.name,
        };
        return organizationModel;
    }

    toPersistence(i: OrganizationInput): Organization {
        const organization: Organization = new Organization();
        organization.name = i.name;
        organization.logo = i.logo;
        organization.email = i.email;
        organization.creation = moment().format();
        organization.last_update = moment().format();
        return organization;
    }

}