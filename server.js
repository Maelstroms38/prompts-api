const express = require('express');
const PORT = process.env.PORT || 3000;

const { Prompts, sequelize } = require('./models');

const app = express();

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send("This is root!");
});

app.get('/prompts', async (req, res) => {
    const prompts = await Prompts.findAll()
    res.json(prompts)
})

app.get('/prompts/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const prompt = await Prompts.findByPk(id)
    res.json(prompt)
})

app.get('/random', async (req, res) => {
	const prompt = await Prompts.findOne({ 
	  order: sequelize.random() 
	});
	res.json(prompt)
})