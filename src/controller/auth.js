const models = require("../models");
const { signAccessToken } = require("../middlewares/jwt");
const { generatePassword } = require("../utils/commonFunctions");
const createError = require("http-errors");

module.exports = {


  login: async (req, res, next) => {
    const body = req.body;
    try {

      console.log(body.userName);

      if ((body.userName || body.password) === undefined)
        throw createError.BadRequest("body not found")

      const result = await models.Vendor.findOne({
        where: {
          userName: body?.userName
        },
      });


      if (!result) {
        throw createError.Unauthorized("invalid username/password");
      }
      // const comparedPass = await bcrypt.compare(body.password, result.password);

      // if (!comparedPass)
      //   throw createError.Unauthorized("invalid username/password");

      if (body.password !== result.password)
        throw createError.Unauthorized("invalid username/password");

      const token = await signAccessToken(
        JSON.stringify(result.id),
        process.env.USER_ACCESS_TOKEN_SECRET
      );

      res.status(200).json({ status: "success", token });
    } catch (error) {
      next(error);
    }
  },

}