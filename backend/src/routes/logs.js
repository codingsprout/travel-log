const { Router } = require('express')
const JournalEntry = require('../database/JournalEntry')

const router = Router()

router.get('/', async (req, res, next) => {
    try {
        const entries = await JournalEntry.find()
        res.status(200).json(entries)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const journalEntry = new JournalEntry(req.body)
        const createdEntry = await journalEntry.save()
        res.status(200).json(createdEntry)
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400)
        }

        next(error)
    }
})

module.exports = router