const express =require('express');
// const app =express() this stmnt create a new app we dont need new app
// so we use router
// this method used to create different router
const route =express.Router();
// this file allows us to render diffrent files using router   
const services = require('../services/render');
// import controller
const controller = require('../controller/controller');

// /**
//  *  @description Root Route
//  *  @method GET /
//  */
route.get('/',services.homeRoutes)

//  /**
//   *  @description add users
//   *  @method GET /add-user
//   */
 
route.get('/add-user',services.add_user)
//  /**
//   *  @description for update user
//   *  @method GET /update-user
//   */

route.get('/update-user',services.update_user)

// API
route.post('/api/users',controller.create)
route.get('/api/users',controller.find)
route.put('/api/users/:id',controller.update)
route.delete('/api/users/:id',controller.delete)
// we need to export 
module.exports=route;