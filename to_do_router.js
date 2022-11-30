const { Router } = require('express');
var express = require('express');
var router = express.Router();


var to_dos = [
   {
   id: 1, 
   description: "Fight Club", 
   status: "pending"
   },
      {
      id: 2, 
      description: "Watch Match", 
      status: "pending"
      },
      
      {
         id: 3, 
         description: "Maths Practice", 
         status: "pending"
         },
      
      {
         id: 4, 
         description: "Go to Library", 
         status: "pending"
      }
   
];


// GET 
// /api/todos : Get List of todos

router.get('/todos', function(req, res){
    res.json(to_dos);
 });


//GET 
// /api/todo/{todoId} : Get todo by todoId

router.get('/todo/:id([0-9])', function(req, res){
   
   // filter current to do
   var curr_to_do = to_dos.filter(function(to_do){
      if(to_do.id == req.params.id){
         return true;
      }
   });

   // set response if todo id is valid
   
   if(curr_to_do.length == 1){
      res.status(200)
      res.json(curr_to_do[0])
   }else { 
      // set response if todo id is in valid
      res.status(404);
      res.json({message: "Todo with id:" + req.params.id + " Not Found"});
   }

}); 


// POST
// /api/todo : Create a new todo with status pending
// return id   
 
router.post('/todo', function(req, res){

   if(!req.body.description || !req.body.description.toString().match(/^(?!\s*$).+/)  ){
      res.status(400);
      res.json({message: "Bad Request-- Either Description is not defined or Description is empty"});
   }
   else{
         var newId = to_dos[to_dos.length-1].id + 1;
         var def_status = "pending"

         to_dos.push({
            id: newId,
            description: req.body.description,
            status : def_status
         });
         res.json({message: "New todo created with id: " + newId}); 
    } 
 });


// POST
// /api/todo/{todoId}/  Mark todo status as done
// POST  status as done



router.post('/todo/:id([0-9])/done', function(req, res){
   

   var curr_index = to_dos.findIndex((
      function(to_do){
         return to_do.id == req.params.id
      }
   ));

   
   if(curr_index === -1){      
         res.json({ message:  "todo with id:" + req.params.id + " Not found"})        
      }
   else {
         var status_done = 'done'
         to_dos[curr_index].status = status_done
         res.json({message: "To do with id:" + req.params.id + " is set to done"})
      }     
});


//delet
router.delete('/todo/:id([0-9])/delete', function(req, res){
 
  
   var remove_index = to_dos.findIndex((
      function(to_do){
         return to_do.id == req.params.id
      }
   ));
   
    if(remove_index === -1){
      res.json({message: "To_do id  " + req.params.id + " Not found"})   
    } else {
       to_dos.splice(remove_index, 1);
       res.send({message: "To_do with id:" + req.params.id + " is removed."});
    }
 });


 

 module.exports = router