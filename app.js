const express = require('express');
const { v4: uuidv4 } = require('uuid'); 
const app = express();

app.use(express.json()); 


let pessoas = [];


app.get('/pessoas', (req, res) => {
    res.json(pessoas);
});


app.post('/pessoas', (req, res) => {
    const { nome, celular } = req.body;
    const novaPessoa = {
        id: uuidv4(), 
        nome,
        celular
    };
    pessoas.push(novaPessoa);
    res.status(201).json(novaPessoa);
});


app.put('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const { nome, celular } = req.body;

    const pessoaIndex = pessoas.findIndex(p => p.id === id);
    if (pessoaIndex !== -1) {
        pessoas[pessoaIndex] = { id, nome, celular };
        res.json(pessoas[pessoaIndex]);
    } else {
        res.status(404).json({ message: 'Pessoa não encontrada' });
    }
});


app.delete('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const pessoaIndex = pessoas.findIndex(p => p.id === id);

    if (pessoaIndex !== -1) {
        pessoas.splice(pessoaIndex, 1);
        res.json({ message: 'Pessoa removida com sucesso' });
    } else {
        res.status(404).json({ message: 'Pessoa não encontrada' });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
