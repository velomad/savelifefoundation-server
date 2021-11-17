const router = require("express").Router()
const { addCase, viewCases , deleteCase} = require("../controller/case")

router.post("/add", addCase)
router.get("/allCases", viewCases)
router.get("/delete/:caseId", deleteCase)

module.exports = router