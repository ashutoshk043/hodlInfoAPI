const express = require('express');
const axios = require('axios')
const cinmodel = require('../modal/coinmodel');
const coinmodel = require('../modal/coinmodel');

const router = express.Router();
router.get('/', async (req, res) => {
    try {
        let options = {
            method: "get",
            url: `https://api.wazirx.com/api/v2/tickers`
        }
        let result = await axios(options);
        let data = result.data
        const top10val = Object.values(data).slice(0,10)
        for(let i=0; i<top10val.length; i++){
            let allVal = {}
            allVal.name =top10val[i].name
            allVal.last =top10val[i].last
            allVal.sell =top10val[i].sell
            allVal.buy =top10val[i].buy
            allVal.volume =top10val[i].volume
            allVal.base_unit =top10val[i].base_unit

            let DBStore = await coinmodel.find({})
            if(DBStore.length<11){
                let DBStore = await coinmodel.create(allVal)
            }else{
                let DBStoredData = await coinmodel.updateMany({name:allVal.name},{$set:{name: allVal.name, last:allVal.last,sell: allVal.sell, buy: allVal.buy,volume:allVal.volume,base_unit:allVal.base_unit}})
            }
           
        }
        let DBStore = await coinmodel.find({}).limit(10)
        console.log(DBStore)
        res.render("index")
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
    
})

module.exports = router