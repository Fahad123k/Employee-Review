var Userdb = require('../model/model');

// create and save new user
exports.create = (req, res) => {
    // validaye request
    // when you make request using post all the data of th e fomm
    // stored in the request object of body and using this body we access form data
    if (!req.body) {
        req.status(400({ message: "Content cant not be empty" }))
        return;
    }
    // new user 
    const user = Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })
    // save user in the database
    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating a create operation "
            });
        });

}

// retrive and return all users/retrive and return a single user in same method
exports.find = (req, res) => {


    if (req.query.id) {
        // find single by id
        const id = req.query.id;
        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found user with id:" + id })
                }
                else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Eror retriving user with id:" + id })
            })

    }
    else {
        // find all the users
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving user information" })
            })

    }



}

// update a new identified user by user id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "data to update can not be empty" })
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {

                res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
            }
            else {
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({ message : "Error Update user information"})
        })

}

// Delete with specified user by user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });


}

