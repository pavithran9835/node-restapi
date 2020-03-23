const assert = require('assert');
const Product = require('../model/product.model');

module.exports = {

    home: (req , res) => {
        //To Read All Products
        Product.find((err , data) => {
            if(err) {
                assert.equal(null , err);
            } else {
        // Response In Json
                res.json(data);
            }
        });
    },

    newProduct: (req , res) => {
        let pro = new Product(req.body);

        pro.save()
        .then(
            //Success Request
            response => {
                res.status(200).json({ message : 'Product Created' });
            })
        .catch(
            //Error Request
            err => {
                res.status(400).json({ message : 'Unable To Save Data'})
            });
    },

    editProduct: (req , res) => {
        //To get Single Product
        let id = req.params.id;

        Product.findById({ _id : id } , (err , data) => {
            if(err) {
                assert.equal(null ,err); 
            } else {
                res.json(data);
            }
        });
    },
    
    updateProduct: (req , res) => {
        //Update Existing 
        let id = req.params.id;

        Product.findById({ _id : id } , (err , data) => {
            if(err) {
                assert.equal(null , err);
            } else {
              if(!data) {
                res.status(400).json({ message : 'No Data Found'})
              
            } else {
                data.title = req.body.title;
                data.image = req.body.image;
                data.price = req.body.price;
                data.category = req.body.category;
                data.description = req.body.description;

                data.save()
                    .then(
                        response => {
                            res.status(200).json({ message : 'Product Updated'});
                        })
                    .catch(
                        err => {
                            res.status(400).json({ message : 'Unable to Update'});
                        });
            }
        }
        });
    },

    deleteProduct: (req , res) => {
        let id = req.params.id;

        Product.findByIdAndDelete({ _id : id} , (err , data) => {
            if(err) {
                assert.equal(null , data);
            } else {
                res.status(200).json({ message : 'Product Deleted'});
            }
        });
    }
};