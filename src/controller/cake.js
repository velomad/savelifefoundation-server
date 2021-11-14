const models = require("../models");
const generateAndSendEmail = require('../utils/mail');
const { Op } = require("sequelize");

module.exports = {
    addCake: async (req, res, next) => {
        const body = req.body
        const { aud } = req.payload;

        try {
            const result = await models.VendorCake.create({ vendorId: aud, ...body })
            generateAndSendEmail.sendEmail({ body: `Cake ${body.cakeName} has been added by vendor`, subject: "Cake has been added" });

            res.status(201).json({
                status: "success",
                result
            })
        } catch (error) {
            console.log(error);
            next(error)

        }

    },

    viewCakes: async (req, res, next) => {
        const { aud } = req.payload;
        try {
            const result = await models.VendorCake.findAll({ where: { vendorId: aud } });
            res.status(200).json({
                status: "success",
                cakes: result
            })

        } catch (error) {
            next(error)
        }
    },

    deleteCake: async (req, res, next) => {
        const cakeId = req.params.cakeId
        const { aud } = req.payload;
        try {

            const cake = await models.VendorCake.findOne({ where: { id: cakeId } })



            await models.VendorCake.destroy({
                where: {
                    [Op.and]: [
                        { id: cakeId },
                        { vendorId: aud },
                    ],
                }
            });

            generateAndSendEmail.sendEmail({ body: `Cake ${cake.name} has been deleted by vendor`, subject: "Cake has been deleted" });
            res.status(200).json({
                status: "success",
                message: "cake has been deleted !"
            })

        } catch (error) {
            next(error)
        }
    }
}
