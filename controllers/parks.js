import express from 'express'
import Park from '../models/park.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const allParks = await Park.find({})
        res.render('parks/index.ejs', { user: req.session.user, parks: allParks})
    } catch (error) {
        console.error(error)
        res.status(500).send('There was a problem getting the parks')
    }
})

router.get('/:parkId', async (req, res) => {
    const park = await Park.findById(req.params.parkId)
    //Logic for sending single park info to ejs
    try {
        console.log(park);
        res.render('parks/park.ejs', {park: park})
    } catch (error) {
        console.error(error)
        res.status(500).send('There was a problem getting the park.')
    }
})

export default router