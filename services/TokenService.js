const db = require("../db/index")
const models = db.sequelize.models;
const {Op} = require("sequelize");

class TokenService {
    constructor() { }

    async findOne(id) {
        const res = await models.Token.findByPk(id);
        return res;
    }

    async find(params) {
        const query = {};

        if (params) {
            query.where = params;
        }

        const res = await models.Token.findAll(query);
        return res;
    }

    async create(data) {
        const res = await models.Token.create(data);
        return res;
    }

    async update(id, data) {
        const model = await this.findOne(id);
        const res = await model.update(data);
        return res;
    }

    async delete(id) {
        const model = await this.findOne(id);
        await model.destroy();
        return { deleted: true };
    }

    async findValids(token) {
        const res = await models.Token.findOne({
            where: {
                token: { [Op.eq]: token },
                fechaExpiracion: { [Op.gt]: new Date() }
            }
        });
        return res;
    }
}

module.exports = TokenService;