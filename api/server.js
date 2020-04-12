const express = require("express");

//Connection to the database
const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

//GET the data from the database
server.get('/', (req, res) => {
    db.select('*') 
    .from('accounts') //returns a promise
    .then(rows => {
        res.status(200).json({ data: rows});
    })
      .catch(error => {
        res.status(500).json({message: "Sorry, Error "});
      });      
    });

    server.get('/:id', (req, res) => {
        db('accounts') 
        .where({id: req.params.id})
        .first()//grabs the first element changing the code to the below:
        // .then(accounts => {
        //     res.status(200).json({data: account});
        .then(rows => {
            res.status(200).json({data: rows});
        })
        .catch(error => {
            res.status(500).json({message:"Sorry, error"})
        });
    });
//Can add  if statement so the client knows that what they are searching for is not available if(post){
//     res.status(200).json({data: rows});
// } else{
//     res.status(404).json({message:"Post Not found"})
// }



    server.post('/', (req, res) => {
        db('accounts')
        .insert(req.body, "id")
        .then(ids => {
            res.status(201).json({results: ids});
        })
        .catch(error => {
            res.status(500).json({message: "Sorry, Error "});
    });
});



server.put('/:id', (req, res) => {
    const changes = req.body;

    db('accounts').where({id: req.params.id})
    .update(changes)
    .then(count => {
        if (count > 0){
        res.status(200).json({message: "Succesfully Updated"})

    } else {
        res.status(404).json({message:"Post Not found"})
    }})
    .catch(error => {
        res.status(500).json({message: "Sorry, Error "});
});
});

server.delete('/:id', (req, res) => {
    db('accounts').where({id: req.params.id})
    .del() //deletes the record. Always filter or it will delete all data on the table
    .then(count => {
        if (count > 0){
        res.status(200).json({message: "Succesfully Deleted"})

    } else {
        res.status(404).json({message:"Post Not found"})
    }})
    .catch(error => {
        res.status(500).json({message: "Sorry, Error "});
});
})

module.exports = server;
