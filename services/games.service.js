const repo = require("../repositories/games.repository")
const userRepo = require("../repositories/users.repository")

const createGame = async (game) => {
    try {
        const user = await userRepo.getUser(game.player_1)
        if (!user) {
            throw new Error("Player 1 not found")
        }
        if (game.player_2) {
            const player_2 = await userRepo.getUser(game.player_2)
            if (!player_2) {
                throw new Error("Player 2 not found")
            }
        }
        game.created_at = Date.now()
        if (game.type === 'pvp_online') {
            game.game_code = Math.floor(100000 + Math.random() * 900000)
        }
        return await repo.createGame(game)
    } catch(error) {
        throw new Error(error.message)
    }
}

const updateGame = async (req) => {
    try {
        const game_ = await repo.getGameByID(req.params.id)
        if (!game_) {
            throw new Error("Game not found")
        }
        req.body.player_1 = game_.player_1
        return await repo.updateGame(req.body, req.params.id)
    } catch(error) {
        throw new Error(error.message)
    }
}

const getGameByUserID = async (userID) => {
    try {
        const user = await userRepo.getUser(userID)
        if (!user) {
            throw new Error("User not found")
        }
        const res = await repo.getGameByUserID(userID)
        if (res.length === 0) {
            throw new Error("No game found")
        }
        return res
    } catch(error) {
        throw new Error(error.message)
    }
}

const connectUser = async (req) => {
    try {
        const game_ = await repo.getGameByID(req.body.id_game)
        if (!game_) {
            throw new Error("Game not found")
        }
        return await repo.connectUser(req.body.player_2, req.body.id_game)
    } catch(error) {
        throw new Error(error.message)
    }
}

const getGameByID = async (id) => {
    try {
        const res = await repo.getGameByID(id)
        if (!res) {
            throw new Error("Game not found")
        }
        return res
    } catch(error) {
        throw new Error(error.message)
    }
}

const getGameByGameCode = async (code) => {
    try {
        const res = await repo.getGameByGameCode(code)
        if (!res) {
            throw new Error("Game not found")
        }
        return res
    } catch(error) {
        throw new Error(error.message)
    }
}

module.exports = {createGame, getGameByUserID, getGameByID, updateGame, connectUser, getGameByGameCode}