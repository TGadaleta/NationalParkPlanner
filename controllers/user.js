import express from 'express'

const router = express.Router();

router.get('/:userId', (req, res) => {
    try {
        res.render('user/index.ejs', {user: req.session.user})
    } catch (error) {
        console.error(error)
        res.status(500).send('There was an error getting your profile')
    }
})

export default router