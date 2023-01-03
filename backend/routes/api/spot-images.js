const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, ReviewImage, SpotImage, User, Booking, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize")

const router = express.Router();


// delete spot image

router.delete('/:spotImageId', requireAuth, async (req, res, next) => {
    const currentSpotImageId = Number(req.params.spotImageId)
    const loggedInUserId = res.req.user.dataValues.id

    const spotCheck = await SpotImage.findOne({
        where: {id: currentSpotImageId},
        attributes: ["id", "spotId"],
        include: [{model: Spot}]
    })


    if (spotCheck === null) {
        const err = new Error()
        err.message = "Spot Image couldn't be found";
        err.status = 404;
        err.statusCode = 404;
        return next(err)
    }

    if (spotImageQueryTest.dataValues.Spot.dataValues.ownerId !== loggedInUserId)  {
        const err = new Error()
        err.message = "Spot must belong to the current User"
        err.status = 403
        err.statusCode = 403
        return next(err)
    }

    await spotImageQueryTest.destroy()
    res.json({message: "Successfully deleted"})
})

module.exports = router;
