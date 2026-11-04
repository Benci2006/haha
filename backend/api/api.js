const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');
const { request } = require('http');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

let tomb = [ {
    kerdesid : 0,
    kerdes: "Ki vagy",
    valasz1: "Te",
    valasz2: "én",
    jovalasz: 1
}]

router.post('/hozzaad', (request, response)=>{
    let max = 0;
    for (let i = 1; i < tomb.length;i++){
        if(tomb[i].kerdesid > tomb[maxi].kerdesid){
            max = i
        }
    }
    tomb.push({kerdesid: tomb[max]+1,
    kerdes: request.body.kerdes,
    valasz1: request.body.valasz1,
    valasz2: request.body.valasz2,
    jovalasz:request.body.jovalasz
})
    
    response.status(200).json({
        tomb:tomb,
        message:"Működik"

    })

})

router.get('/kerdes', (request, response)=>{
    response.status(200).json({
        kerdes1 : tomb[1],
        valasz1 : tomb[2],
        valasz2 : tomb[3]
    })
    
})

router.get('/valasz', (request,response)=>{
    
    response.status(200).json({
        helyesvalasz: tomb[`${tomb[4]}`]
    })
})


router.post('/torol', (request, response)=>{
    
    if(tomb.includes(request.body.kerdesid)){
        tomb.splice(request.body.kerdesid, 1)
    }
    response.status(200).json({
        tomb:tomb,
        message:"Működik"

    })

})
//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

module.exports = router;
