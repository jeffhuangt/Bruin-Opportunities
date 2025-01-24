const Opportunity = require('../models/opportunityModel')
const mongoose = require('mongoose')


const getOpportunities = async (req, res) => {
    const opportunities = await Opportunity.find({}).sort({createdAt: -1})

    res.status(200).json(opportunities)
}


const getOpportunity = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such opportunity'})
    }

    const opportunity = await Opportunity.findById(id)

    if (!opportunity){
        return res.status(404).json({error: 'No such opportunity'})
    }

    res.status(200).json(opportunity)
}



const createOpportunity = async (req, res) => {
    const {title, field, pay} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }

    if(!field) {
        emptyFields.push('field')
    }

    if(!pay) {
        emptyFields.push('pay')
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }


    try {
        const opportunity = await Opportunity.create({title, field, pay})
        res.status(200).json(opportunity)
    }   catch(error){
        res.status(400).json({error: error.message})
    }
}


const deleteOpportunity = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such opportunity'})
    }

    const opportunity = await Opportunity.findByIdAndDelete({_id: id})

    if (!opportunity){
        return res.status(400).json({error: 'No such opportunity'})
    }

    res.status(200).json(opportunity)
}

const updateOpportunity = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such opportunity'})
    }

    const opportunity = await Opportunity.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!opportunity){
        return res.status(400).json({error: 'No such opportunity'})
    }

    res.status(200).json(opportunity)
}


module.exports = {
    getOpportunities,
    getOpportunity,
    createOpportunity,
    deleteOpportunity,
    updateOpportunity
}