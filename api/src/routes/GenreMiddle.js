const axios = require('axios');
const express = require('express');
const { Videogame, Genre } = require('../db.js');
const { API_KEY } = process.env

const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const getGenres = await Genre.findAll()

        return res.status(200).json(getGenres)
        
    } catch (error) {
        return res.status(404).send('An error has ocurred');
    }
});




module.exports = router