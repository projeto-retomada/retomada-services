import { Response, Request, NextFunction } from 'express';
import db from '../database/connection';
import HttpException from '../error/HttpException';

export default class DashController {

    public getStudentPositiveCount = async (request: Request, response: Response, next: NextFunction) => {
        const students = await db('health_questionnaire').select('*').distinct('health_questionnaire.user_id')
            .innerJoin('user', 'health_questionnaire.user_id', '=', 'user.id_user').where('user.role', 'STUDENT').catch((err) => {
                next(new HttpException(500, 'Unexpected error getting users', err.sqlMessage));
            });
        const userCount = await db('user').where('user.role', 'STUDENT').count('id_user').catch((err) => {
            next(new HttpException(500, 'Unexpected error getting users', err.sqlMessage));
        });
        return response.status(200).json({ positive_students: students.length, total_students: parseInt(userCount[0].count) });
    }

    public getTeacherPositiveCount = async (request: Request, response: Response, next: NextFunction) => {
        const teachers = await db('health_questionnaire').select('*').distinct('health_questionnaire.user_id')
            .innerJoin('user', 'health_questionnaire.user_id', '=', 'user.id_user').where('user.role', 'TEACHER').catch((err) => {
                next(new HttpException(500, 'Unexpected error getting users', err.sqlMessage));
            });
        const userCount = await db('user').where('user.role', 'TEACHER').count('id_user').catch((err) => {
            next(new HttpException(500, 'Unexpected error getting users', err.sqlMessage));
        });
        return response.status(200).json({ positive_teachers: teachers.length, total_teachers: parseInt(userCount[0].count) });
    }

    public getAdminPositiveCount = async (request: Request, response: Response, next: NextFunction) => {
        const admins = await db('health_questionnaire').select('*').distinct('health_questionnaire.user_id')
            .innerJoin('user', 'health_questionnaire.user_id', '=', 'user.id_user').where('user.role', 'ADMIN').catch((err) => {
                next(new HttpException(500, 'Unexpected error getting users', err.sqlMessage));
            });
        const userCount = await db('user').where('user.role', 'ADMIN').count('id_user').catch((err) => {
            next(new HttpException(500, 'Unexpected error getting users', err.sqlMessage));
        });
        return response.status(200).json({ positive_admins: admins.length, total_admins: parseInt(userCount[0].count) });
    }

    public getTimeSeriesCovid = async (request: Request, response: Response, next: NextFunction) => {
        const data = await db('health_questionnaire').select('creation').count('id_health_quest as count')
            .whereRaw("answer::json ->> 'testedPositive' = 'yes'")
            .groupBy('creation')
            .catch((err) => {
                console.log(err);
                next(new HttpException(500, 'Unexpected error getting users', err.sqlMessage));
            });
        const dados: any[] = data;
        dados.forEach((element) => {
            element.creation = element.creation.toISOString().substring(0, 10);
            console.log(element);
        });
        var result = Object.values(dados.reduce((r, o) => {
            r[o.creation] = r[o.creation] || { creation: o.creation, count: 0 };
            r[o.creation].count += +o.count;
            return r;
        }, {}));
        return response.status(200).json(result);
    }

    public getLastStudentsCases = async (request: Request, response: Response, next: NextFunction) => {
        const data = await db('health_questionnaire').select('*')
            .innerJoin('user', 'health_questionnaire.user_id', 'user.id_user')
            .catch((err) => {
                console.log(err);
                next(new HttpException(500, 'Unexpected error getting users', err.sqlMessage));
            });
        let dados: any[] = data;
        let sorted = dados.sort((a: any, b: any) => {
            return Math.abs(new Date(b.creation) - new Date(a.creation));
        });
        let filter = sorted.filter((element) => {
            if(JSON.parse(element.answer).testedPositive === 'yes' && element.role === 'STUDENT') {
                return element;
            }
        });
        return response.status(200).json(filter);
    }

    
    public getLastTeachersCases = async (request: Request, response: Response, next: NextFunction) => {
        const data = await db('health_questionnaire').select('*')
            .innerJoin('user', 'health_questionnaire.user_id', 'user.id_user')
            .catch((err) => {
                console.log(err);
                next(new HttpException(500, 'Unexpected error getting users', err.sqlMessage));
            });
        let dados: any[] = data;
        let sorted = dados.sort((a: any, b: any) => {
            return Math.abs(new Date(b.creation) - new Date(a.creation));
        });
        let filter = sorted.filter((element) => {
            if(JSON.parse(element.answer).testedPositive === 'yes' && element.role === 'TEACHER') {
                return element;
            }
        });
        return response.status(200).json(filter);
    }

    public getCasesByUsergroup = async (request: Request, response: Response, next: NextFunction) => {
        const data = await db.raw("WITH t1 as(SELECT count(DISTINCT health_questionnaire.user_id) casos, usergroup_id FROM public.health_questionnaire INNER JOIN public.user_usergroup_relation ON public.user_usergroup_relation.user_id = public.health_questionnaire.user_id WHERE answer::json ->> 'testedPositive' = 'yes'group by usergroup_id) SELECT t1.*, name FROM public.usergroup INNER JOIN t1 ON public.usergroup.id_usergroup = t1.usergroup_id")
        .catch((err) => {
            console.log(err);
            next(new HttpException(500, 'Unexpected error getting users', err.sqlMessage));
        });
        return response.status(200).json(data.rows);
    }
}