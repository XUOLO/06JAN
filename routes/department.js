var express = require('express');
const { model } = require('mongoose');
const { use } = require('.');
var router = express.Router();
var responseData = require('../helper/responseData');
var modelproduct = require('../models/department')
 const {validationResult} = require('express-validator');
var Schemaproduct = require('../schema/department')
 



router.get('/', async function (req, res, next) {
 
   
  var productsAll = await modelproduct.getall(req.query);
  responseData.responseReturn(res, 200, true, productsAll);

});
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

router.get('/:id', async function (req, res, next) {// get by ID
    try {
      var user = await modelproduct.getOne(req.params.id);
      
      if(user){
        responseData.responseReturn(res, 200, true, user);
      }
      else{
        responseData.responseReturn(res, 404, false, "khong tim thay deparrt");
      }
    } catch (error) {
      responseData.responseReturn(res, 404, false, "khong tim thay deparrt");
    }
  });
router.post('/add' ,
  async function (req, res, next) {
    var errors = validationResult(req);
    if(!errors.isEmpty()){
      responseData.responseReturn(res, 400, false, errors.array().map(error=>error.msg));
      return;
    }
 
  else {
    const newproduct = await modelproduct.createproduct({
      name: req.body.name,
       
    })
    responseData.responseReturn(res, 200, true, newproduct);
  }
});
router.put('/edit/:id', async function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responseData.responseReturn(res, 400, false, errors.array().map(error => error.msg));
      return;
    }
 
    const product = await modelproduct.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    responseData.responseReturn(res, 200, true, product);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay department");
  }
});


router.delete('/delete/:id', async function (req, res, next) {
  try {
    

    await modelproduct.delete(req.params.id);
     responseData.responseReturn(res, 200, true, "Xoá thành công");
  } catch (error) {
    responseData.responseReturn(res, 404, false, "Không tìm thấy department");
  }
});



router.get('/search/:key', async (req, res) => {
  try {
    const searchKey = req.params.key;
    const result = await Schemaproduct.find({
      $or: [
        { name: { $regex: searchKey, $options: 'i' } },
        { description: { $regex: searchKey, $options: 'i' } }
      ]
    });
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


module.exports = router;
