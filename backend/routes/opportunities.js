const express = require('express')
const {
    createOpportunity,
    getOpportunities,
    getOpportunity,
    deleteOpportunity,
    updateOpportunity
} = require('../controllers/opportunityController')

const router = express.Router()

router.get('/', getOpportunities)


router.get('/:id', getOpportunity)

router.post('/', createOpportunity)

router.delete('/:id', deleteOpportunity)

router.patch('/:id', updateOpportunity)

module.exports = router
