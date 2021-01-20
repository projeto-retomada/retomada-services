import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('health_questionnaire').insert([
        {
            answer: '{"fever":"yes","testedPositive":"yes","exposedVirus":"yes","lossTaste":"yes","chestPressure":"yes","shortnessBreathe":"yes","tiredness":"yes"}',
            user_id: '1',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
        {
            answer: '{"fever":"yes","testedPositive":"yes","exposedVirus":"yes","lossTaste":"yes","chestPressure":"yes","shortnessBreathe":"yes","tiredness":"yes"}',
            user_id: '2',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
        {
            answer: '{"fever":"yes","testedPositive":"yes","exposedVirus":"yes","lossTaste":"yes","chestPressure":"yes","shortnessBreathe":"yes","tiredness":"yes"}',
            user_id: '3',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
        {
            answer: '{"fever":"yes","testedPositive":"yes","exposedVirus":"yes","lossTaste":"yes","chestPressure":"yes","shortnessBreathe":"yes","tiredness":"yes"}',
            user_id: '4',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
        {
            answer: '{"fever":"yes","testedPositive":"yes","exposedVirus":"yes","lossTaste":"yes","chestPressure":"yes","shortnessBreathe":"yes","tiredness":"yes"}',
            user_id: '5',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
        {
            answer: 'Com febre',
            user_id: '6',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
        {
            answer: 'Com febre',
            user_id: '7',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
        {
            answer: 'Com febre',
            user_id: '8',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
        {
            answer: 'Com febre',
            user_id: '9',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
        {
            answer: 'Com febre',
            user_id: '10',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
        {
            answer: '{"fever":"yes","testedPositive":"yes","exposedVirus":"yes","lossTaste":"yes","chestPressure":"yes","shortnessBreathe":"yes","tiredness":"yes"}',
            user_id: '11',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
        {
            answer: '{"fever":"yes","testedPositive":"yes","exposedVirus":"yes","lossTaste":"yes","chestPressure":"yes","shortnessBreathe":"yes","tiredness":"yes"}',
            user_id: '12',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
        {
            answer: '{"fever":"yes","testedPositive":"yes","exposedVirus":"yes","lossTaste":"yes","chestPressure":"yes","shortnessBreathe":"yes","tiredness":"yes"}',
            user_id: '13',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
        {
            answer: '{"fever":"yes","testedPositive":"yes","exposedVirus":"yes","lossTaste":"yes","chestPressure":"yes","shortnessBreathe":"yes","tiredness":"yes"}',
            user_id: '14',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
        {
            answer: '{"fever":"yes","testedPositive":"yes","exposedVirus":"yes","lossTaste":"yes","chestPressure":"yes","shortnessBreathe":"yes","tiredness":"yes"}',
            user_id: '15',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
    ]);
}