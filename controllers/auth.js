import bcrypt from 'bcrypt'
import express from 'express'

import User from "../models/user.js"

const router = express.Router();

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs');
  });

router.get('/sign-out', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

router.post('/sign-up', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username })
        if (userInDatabase){
            return res.send('Username already taken.')
        }
        if (req.body.password !== req.body.confirmPassword){
            return res.send('Passwords did not match.')
        }
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword
        await User.create(req.body)
        res.redirect(`/user/${userId}`)

    } catch (error) {
        console.error(error)
        res.redirect('/')
    }
})

router.post('/sign-in', async (req, res) => {
    try {
      const userInDatabase = await User.findOne({ username: req.body.username });
      if (!userInDatabase) {
        return res.send('Login failed. Please try again.');
      }
      const validPassword = bcrypt.compareSync(
        req.body.password,
        userInDatabase.password
      );
      if (!validPassword) {
        return res.send('Login failed. Please try again.');
      }
      req.session.user = {
        username: userInDatabase.username,
        _id: userInDatabase._id,
        favoriteParks: userInDatabase.favoriteParks,
        plannedTrips: userInDatabase.plannedTrips
      };
      res.redirect(`/user/${req.session.user._id}`);
    } catch (error) {
      console.error(error);
      res.redirect('/');
    }
  });

  export default router