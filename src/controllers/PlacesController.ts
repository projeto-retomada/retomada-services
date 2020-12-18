import { Response, Request, NextFunction } from 'express';
import HttpException from '../error/HttpException';
import { PlacesRepo } from './../repositories/places/PlacesRepo';

export class PlacesController {

    placesRepo: PlacesRepo;

    constructor(placesRepo: PlacesRepo) {
        this.placesRepo = placesRepo;
    }

    public get = async(request: Request, response: Response, next: NextFunction) => {

        const { idOrganization, idPlace } = request.params;

        if (idOrganization && idPlace) {
            try {
                await this.placesRepo.getPlaceById(idOrganization, idPlace).then((resp) => {
                    return response.status(200).json(resp).send(); 
                });
            } catch (err) {
                next(new HttpException(500, 'Unexpected error getting place', err.sqlMessage));
            }
        } else {
            try {
                await this.placesRepo.findAllPlaces(idOrganization).then((resp) => {
                    return response.status(200).json(resp).send(); 
                });
            } catch (err) {
                next(new HttpException(500, 'Unexpected error getting places', err.sqlMessage));
            }
        }
    }

    public create = async(request: Request, response: Response, next: NextFunction) => {

        const body = request.body;
        const { idOrganization } = request.params;

        if (body) {

            try {
                const place = await this.placesRepo.savePlace(idOrganization, body);
                return response.status(201).json(place).send(); 
            }catch (err) {
                next(new HttpException(500, err.message || 'Unexpected error saving Place', ''));
            }
        }
    }

    public update = async(request: Request, response: Response, next: NextFunction) => {

        const { idOrganization, idPlace } = request.params;
        const body = request.body;

        if (body && idPlace && idOrganization) {
            try {
                const place:any = await this.placesRepo.updatePlace(idOrganization, idPlace, body);
                return response.status(200).json(place);
            }catch(err) {
                next(new HttpException(500, err.message || 'Unexpected error updating place', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }

    public delete = async(request: Request, response: Response, next: NextFunction) => {

        const { idOrganization, idPlace } = request.params;

        if (idOrganization && idPlace) {
            try {
                const user = await this.placesRepo.deletePlace(idOrganization, idPlace);
                return response.status(204).send(); 
            }catch(err) {
                next(new HttpException(500, err.message || 'Unexpected error deleting places', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }

}