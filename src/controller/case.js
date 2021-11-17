const models = require("../models")
const { Op } = require("sequelize");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const { destroy, upload } = require("../cloudinary");
const { signAccessToken } = require("../middlewares/jwt");

module.exports = {
    addCase: async (req, res, next) => {
        const body = req.body;
        let image, response;

        try {

            if (req.file) {
                image = req.file.path;
                response = await upload(image);
            }

            const result = await models.Case.create({
                ...body,
                imageUrl: image ? response.url : null,
            });

            console.log(response);

            res.status(201).json({ status: "success", result });


        } catch (error) {
            next(error)
        }
    },

    viewCases: async (req, res, next) => {
        try {
            const result = await models.Case.findAll({})
            res.status(200).json({
                status: "success",
                cases: result
            })
        } catch (error) {
            next(error)
        }
    },

    deleteCase: async (req, res, next) => {
        const caseId = req.params.caseId
        try {
            await models.Case.destroy({ where: { id: caseId } })
            res.status(200).json({
                status: "success",
                message: "case deleted successfully"
            })
        } catch (error) {
            next(error)
        }
    }
}