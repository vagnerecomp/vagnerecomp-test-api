const router = require('express').Router();
const { route } = require('express/lib/application');
const Burger = require('../models/Burger');



router.post('/', async (req, res)=>{
    const {nome, carne, pao, status, opcionais} = req.body;

    if(!nome || !status){
        res.status(422).json({message: "The name and status fields are required"});
        return
    }

    const burger = {
        nome,
        carne,
        pao,
        status,
        opcionais
    }

    try {
        await Burger.create(burger);
        res.status(200).json({message: "Burger created sucessful"});
    } catch (error) {
        res.status(500).json({error: error});
    }
    
})

router.get('/', async (req, res)=>{
    try {
        const burgers = await Burger.find();
        res.status(200).json(burgers);
    } catch (error) {
        res.status(500).json({error: error});
    }
})

router.get('/:id', async (req, res)=>{
    const id = req.params.id;

    try {
        const burger = await Burger.findOne({_id: id})
        if(!burger){
            res.status(422).json({message: "Burger not found"});
            return;
        }
        res.status(200).json(burger)
    } catch (error) {
        res.status(500).json({error: error});
    }
})


router.patch('/:id', async (req, res)=>{
    const id = req.params.id;

    try {
        const {nome, carne, pao, status, opcionais} = req.body;
        const burger = {
            nome,
            carne,
            pao,
            status,
            opcionais
        };
        
        const updatedBurger = await Burger.updateOne({_id: id}, burger);
        if(updatedBurger.matchedCount === 0){
            res.status(422).json({message: "Burger not found"})
            return;
        }
        res.status(200).json({message: "Burger Updated"});
    } catch (error) {
        res.status(500).json({error: error});
    }
})

router.delete("/:id", async (req, res)=>{
    const id = req.params.id;
    const burger = await Burger.findOne({_id: id})
    if (!burger){
        // (await Burger.findOne({_id: id}))
        res.status(422).json({message: "Burger not found"});
        return;
    }
    try {
        await Burger.deleteOne({_id: id});
        res.status(200).json({message: "Burger removed successful"});
    } catch (error) {
        res.status(500).json({error:error});
    }
})

module.exports = router;