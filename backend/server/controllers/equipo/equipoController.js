const { rmSync } = require('fs');
const Sequelize = require('sequelize');
const { Equipo, Futbolista } = require('../../models');
const db = require("../../models");
const Op = db.Sequelize.Op;
const personalFunctions = require('./funtions')

const createTeam = async (req, res) => {
    try {
        
        const {name, league, country} = req.body;
        if (!name || !league ||!country){
            return res.status(500).json({error:'Missing argument'});
        }
        const checkName = await Equipo.findOne({
            where: {
                name: name
            }
        })

        if (checkName) {
            return res.status(401).json({ error: 'Ese equipo ya existe' });
        }
        const create = await Equipo.create(req.body);
        return res.status(201).json({
            create,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
};



const listTeams = async (req, res) => {

    const { page, size, country, league } = req.query;

    let condition = {
        country: country ? { [Op.like]: `${country}` } : null,
        league : league ? { [Op.like]: `${league}` }  : null
    }

    for (const key in condition) {
        if (condition[key] === null) {
          delete condition[key];
        }
    }

    const { limit, offset } = personalFunctions.getPagination(page, size);

    Equipo.findAndCountAll({
            include: { model: Futbolista },
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

const findTeam = async (req, res) => {
    try {
        const { id } = req.params;

        const team = await Equipo.findOne({
            where: {
                id: id
            },
            include: {
                model: Futbolista
            }
        })
        if (!team){
            return res.status(401).send({error: 'id not exists'});
        }
        
        return res.status(201).json({
            team,
        });
    } catch (error) {
        return res.status(401).json({ error: error.message })
    }
}

const updateTeam = async (req, res) => {
    try {
        
        const { id } = req.params;

        if (!id){
            return res.status(401).send({error: 'Verify Id in params'})
        }

        const team = await Equipo.findOne({
            where: {
                id: id
            }
        })
        // not the same slugName
        if (!team){
            return res.status(401).json({error: "Id not found"})
        }

        const [updated] = await Equipo.update(req.body, {
            where: {
                id:id
            }
        });
        if (updated) {
            const search = await Equipo.findOne({
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

const deleteTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Equipo.destroy({
            where: { id: id}
        });
        if (deleted){
            return res.status(200).send({status:"Equipo eliminado"});
        }
        throw new Error({status:"Equipo no encontrado"});
    } catch(error) {
        return res.status(401).send(error.message);
    }
}

module.exports = {
    createTeam,
    listTeams,
    findTeam,
    updateTeam,
    deleteTeam

}