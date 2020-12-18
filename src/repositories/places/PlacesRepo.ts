import db from '../../database/connection';
import Place from '../../models/Place';
import { PlaceInput } from '../../models/PlaceInput';
import { PlacesIRepo } from './PlacesIRepo';

export class PlacesRepo implements PlacesIRepo {

    async getPlaceById(idOrganization: string, idPlace: string): Promise<Place> {
        const place = await db('place').select('*').where({organization_id: idOrganization}).catch((err) => {
            throw new Error(err.detail);
        });
        return place[0];
    }

    async findAllPlaces(idOrganization: string): Promise<Place[]> {
        const places = await db('place').select('*').where({organization_id: idOrganization}).catch((err) => {
            throw new Error(err.detail);
        });
        return places;
    }

    async savePlace(idOrganization: string, placeInput: PlaceInput): Promise<any[]> {
        const place = await db('place').insert({
            name: placeInput.name,
            maximum_capacity: placeInput.maximum_capacity,
            open_area: placeInput.open_area,
            creation: new Date().toLocaleString(),
            last_update: new Date().toLocaleString(),
            organization_id: idOrganization
        }).then((resp) => {
            console.log(resp);
            return resp;
        }).catch((err) => {
            throw new Error(err.detail);
        });
        return place;
    }

    async updatePlace(idOrganization: string, idPlace: string, placeInput: PlaceInput): Promise<any> {
        const user = await db('place').where({id_place: idPlace}).update({
            name: placeInput.name,
            maximum_capacity: placeInput.maximum_capacity,
            open_area: placeInput.open_area,
        }).then(async (resp) => {
            return resp;
        }).catch((err) => {
            throw new Error(err.detail);
        });
    }

    async deletePlace(idOrganization: string, idPlace: string): Promise<any> {
        const place = await db('place').select('*').where({id_place: idPlace}).del().catch((err) => {
            throw new Error(err.detail);
        });
        return place;
    }

}
