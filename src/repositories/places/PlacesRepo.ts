import db from '../../database/connection';
import HttpException from '../../error/HttpException';
import Place from '../../models/Place';
import { PlaceInput } from '../../models/PlaceInput';
import { OrganizationRepo } from '../organization/OrganizationRepo';
import { PlacesIRepo } from './PlacesIRepo';

export class PlacesRepo implements PlacesIRepo {

    organizationRepo: OrganizationRepo;

    constructor(organizationRepo: OrganizationRepo) {
        this.organizationRepo = organizationRepo;
    }

    async getPlaceById(idOrganization: string, idPlace: string): Promise<Place> {

        await this.organizationRepo.getOrganizationById(idOrganization); 

        const place = await db('place').select('*').where({organization_id: idOrganization, id_place: idPlace}).catch((err) => {
            throw new Error(err.detail);
        });

        if (place.length === 0) {
            throw new HttpException(404, `Cannot find place with id = ${idPlace}`, '');
        }
        return place[0];
    }

    async findAllPlaces(idOrganization: string): Promise<Place[]> {

        await this.organizationRepo.getOrganizationById(idOrganization); 
        
        const places = await db('place').select('*').where({organization_id: idOrganization}).catch((err) => {
            throw new Error(err.detail);
        });
        return places;
    }

    async savePlace(idOrganization: string, placeInput: PlaceInput): Promise<any> {

        await this.organizationRepo.getOrganizationById(idOrganization); 
        
        const place:any = await db('place').insert({
            name: placeInput.name,
            maximum_capacity: placeInput.maximum_capacity,
            open_area: placeInput.open_area,
            creation: new Date().toLocaleString(),
            last_update: new Date().toLocaleString(),
            organization_id: idOrganization
        }).returning('id_place').then(async (id_place) => {
            const placeInserted = await this.getPlaceById(idOrganization, id_place[0]);
            return placeInserted;
        }).catch((err) => {
            throw new Error(err.detail);
        });
        return place;
    }

    async updatePlace(idOrganization: string, idPlace: string, placeInput: PlaceInput): Promise<any> {

        await this.getPlaceById(idOrganization, idPlace);

        const place = await db('place').where({id_place: idPlace}).update({
            name: placeInput.name,
            maximum_capacity: placeInput.maximum_capacity,
            open_area: placeInput.open_area,
        }).then(async (resp) => {
            const placeUpdated = await this.getPlaceById(idOrganization, idPlace);
            return placeUpdated;
        }).catch((err) => {
            throw new Error(err.detail);
        });
        return place;
    }

    async deletePlace(idOrganization: string, idPlace: string): Promise<any> {

        await this.getPlaceById(idOrganization, idPlace);

        const place = await db('place').select('*').where({id_place: idPlace}).del().catch((err) => {
            throw new Error(err.detail);
        });
        return place;
    }

}
