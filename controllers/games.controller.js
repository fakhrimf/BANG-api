const service = require("../services/games.service");
const joi = require("joi");

const gameSchema = joi.object({
    player_1: joi.number().required(),
    player_2: joi.number(),
    id_winner: joi.number(),
    type: joi.string().required(),
    score: joi.string()
})

const createGame = async (req, res) => {
    try {
        const {err, value} = gameSchema.validate(req.body)
        if (err) {
            return res.status(400).json({message: err.message})
        }
        const game = await service.createGame(value)
        return res.status(201).json({message: "Game created", id: game.id_game})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

const updateGame = async (req, res) => {
    try {
        const {err, value} = gameSchema.validate(req.body)
        if (err) {
            return res.status(400).json({message: err.message})
        }
        await service.updateGame(req)
        return res.status(200).json({message: "Game updated"})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

const getGameByUserID = async (req, res) => {
    try {
        const game = await service.getGameByUserID(req.user.id)
        return res.status(200).json(game)
    } catch (error) {
        return res.status(404).json({message: error.message})
    }
}

const getGameByID = async (req, res) => {
    try {
        const game = await service.getGameByID(req.params.id)
        return res.status(200).json(game)
    } catch (error) {
        return res.status(404).json({message: error.message})
    }
}

module.exports = {createGame, getGameByUserID, getGameByID, updateGame}