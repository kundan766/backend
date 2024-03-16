const express=require("express");
const router=express.Router();
const Menu = require("../models/menu");

router.get("/", async (req, res) => {
    try {
        const data = await Menu.find(); // Corrected 'menu' to 'Menu'
        console.log("data saved successfully");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new Menu(data); // Corrected 'menu' to 'Menu'
        const response = await newMenu.save();

        console.log("data saved successfully");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports=router; 