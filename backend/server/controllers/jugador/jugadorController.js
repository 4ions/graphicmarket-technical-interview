const { rmSync } = require('fs');
const Sequelize = require('sequelize');
const { Futbolista, Equipo } = require('../../models');
const db = require("../../models");
const Op = db.Sequelize.Op;
const personalFunctions = require('./funtions')

const createPlayer = async (req, res) => {
    try {
        
        const {name, age, team_id, squad_number, position, nationality} = req.body;
        if (!name || !age ||!team_id || !squad_number || !position || !nationality){
            return res.status(500).json({error:'Missing argument'});
        }

        const equipo = await Equipo.findOne({
            where: {
                id: team_id
            }
        })

        if (!equipo) {
            if (checkName) {
                return res.status(401).json({ error: 'El equipo no existe' });
            }
        }

        const checkName = await Futbolista.findOne({
            where: {
                squad_number: squad_number,
                team_id: team_id
            }
        })

        if (checkName) {
            return res.status(401).json({ error: 'Ese dorsal ya ha sido asignado' });
        }

        console.log(equipo);
        const create = await Futbolista.create(req.body);
        return res.status(201).json({
            create,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
};



const listPlayers = async (req, res) => {

    const { page, size, nationality, position, team_id } = req.query;
    let condition = {
        nationality: nationality ? { [Op.like]: `${nationality}` } : null,
        position: position ? { [Op.like]: `${position}` } : null,
        team_id: team_id ? `${team_id}` : null,
    }

    for (const key in condition) {
        if (condition[key] === null) {
          delete condition[key];
        }
    }

    const { limit, offset } = personalFunctions.getPagination(page, size);

    Futbolista.findAndCountAll({
            where: condition,
            limit,
            offset
        })
            .then(data => {
                const response = personalFunctions.getPagingData(data, page, limit);
                res.send(response);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error ocurred while retrieving info"
                })
            });

    
};

const findPlayer = async (req, res) => {
    try {
        const { id } = req.params;

        const player = await Futbolista.findOne({
            where: {
                id: id
            },
            include: {
                model: Equipo
            }
        })
        if (!player){
            return res.status(401).send({error: 'id not exists'});
        }
        
        return res.status(201).json({
            player,
        });
    } catch (error) {
        return res.status(401).json({ error: error.message })
    }
}

const updatePlayer = async (req, res) => {
    try {
        
        const { id } = req.params;

        if (!id){
            return res.status(401).send({error: 'Verify Id in params'})
        }

        const player = await Futbolista.findOne({
            where: {
                id: id
            }
        })
        // not the same slugName
        if (!player){
            return res.status(401).json({error: "Id not found"})
        }

        const [updated] = await Futbolista.update(req.body, {
            where: {
                id:id
            }
        });
        if (updated) {
            const search = await Futbolista.findOne({
                where: {
                    id: id
                }
            })
            return res.status(200).json({ search });
        }
        throw new Error('Algo extraño ha sucedido');
    } catch (error){
        return res.status(401).send(error.message);
    }
};

const deletePlayer = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Futbolista.destroy({
            where: { id: id}
        });
        if (deleted){
            return res.status(200).send({status:"Futbolista eliminado"});
        }
        throw new Error({status:"Futbolista no encontrado"});
    } catch(error) {
        return res.status(401).send(error.message);
    }
}

module.exports = {
    createPlayer,
    listPlayers,
    findPlayer,
    updatePlayer,
    deletePlayer

}