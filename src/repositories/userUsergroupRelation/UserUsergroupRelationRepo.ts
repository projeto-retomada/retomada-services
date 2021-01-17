import db from '../../database/connection';
import HttpException from '../../error/HttpException';
import moment from 'moment';

export class UserUsergroupRelationRepo {

    public async getRelationByUserId(idUser: string): Promise<any> {
        const userRelation = await db('user_usergroup_relation').select('*').where({ user_id: idUser }).catch((err) => {
            throw new Error(err.detail);
        });
        if (userRelation.length === 0) {
            throw new HttpException(404, `Cannot find user usergroup relation with user_id =${idUser}`, '');
        }
        return userRelation[0];
    }

    public async activeRelation(idUser: string, idUsergroup: string): Promise<any> {
        const relation = await db('user_usergroup_relation').insert({
            user_id: idUser,
            usergroup_id: idUsergroup,
            creation: moment().format(),
            last_update: moment().format()
        }).catch((err) => {
            throw new HttpException(500,err.detail,'');
        });
        return relation;
    }

    public async editRelation(idUser: string, idUsergroup: string): Promise<any> {
        const userRelation = await db('user_usergroup_relation').select('*').where({ user_id: idUser }).catch((err) => {
            throw new Error(err.detail);
        });
        if (userRelation.length > 0) {
            const relation = await db('user_usergroup_relation').where({user_id: idUser}).update({
                user_id: idUser,
                usergroup_id: idUsergroup,
                last_update: new Date().toLocaleString()
            }).then(async (resp) => {
                return resp;
            }).catch((err) => {
                throw new HttpException(500, err.detail,'');
            });
            return relation;
        } else {
            this.activeRelation(idUser,idUsergroup);
        }
    }
}