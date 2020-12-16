import { PlaceInput } from './../../models/PlaceInput';
import Place from "../../models/Place";

export interface PlacesIRepo {
    getPlaceById(idOrganization: string,idPlace: string): Promise<Place>;
    findAllPlaces(idOrganization: string): Promise<Place[]>;
    savePlace(idOrganization: string, placeInput: PlaceInput): Promise<any[]>;
    updatePlace(idOrganization: string, idPlace: string, placeInput: PlaceInput): Promise<any[]>;
    deletePlace(idOrganization: string, idPlace: string): Promise<any>;
}