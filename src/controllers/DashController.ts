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
        return response.status(200).json({positive_students: students.length,total_students:parseInt(userCount[0].count)});
    }

    public getTeacherPositiveCount = async (request: Request, response: Response, next: NextFunction) => {
        const teachers = await db('health_questionnaire').select('*').distinct('health_questionnaire.user_id')
        .innerJoin('user', 'health_questionnaire.user_id', '=', 'user.id_user').where('user.role', 'TEACHER').catch((err) => {
            next(new HttpException(500, 'Unexpected error getting users', err.sqlMessage));
        });
        const userCount = await db('user').where('user.role', 'TEACHER').count('id_user').catch((err) => {
            next(new HttpException(500, 'Unexpected error getting users', err.sqlMessage));
        });
        return response.status(200).json({positive_teachers: teachers.length,total_teachers:parseInt(userCount[0].count)});
    }

    public getAdminPositiveCount = async (request: Request, response: Response, next: NextFunction) => {
        const admins = await db('health_questionnaire').select('*').distinct('health_questionnaire.user_id')
        .innerJoin('user', 'health_questionnaire.user_id', '=', 'user.id_user').where('user.role', 'ADMIN').catch((err) => {
            next(new HttpException(500, 'Unexpected error getting users', err.sqlMessage));
        });
        const userCount = await db('user').where('user.role', 'ADMIN').count('id_user').catch((err) => {
            next(new HttpException(500, 'Unexpected error getting users', err.sqlMessage));
        });
        return response.status(200).json({positive_admins: admins.length,total_admins:parseInt(userCount[0].count)});
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
            r[o.creation] = r[o.creation] || {creation: o.creation, count : 0};
            r[o.creation].count += +o.count;
            return r;
        },{}));
        return response.status(200).json(result);
    }
}