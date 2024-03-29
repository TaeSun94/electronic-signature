var express = require('express');
var documents = express.Router();
var result = require('./../../../../result.js');
var mail = require('./../../../../mail.js');

/*
*insert_document API
*Request
*session_id : Get user's information at DB
*documet_title : Set documet_title in DB
*documet_content : Set documet_content in DB
*signature_second : Set second people to signature in DB
*signature_third : Set third people to signature in DB
*Response
*document_id : if success to insert in DB, return question_id. It will use show_question.
*/
documents.post('/insert_document', function(req,res,next){
  var isValid = true;
  var validationError = {
    name : 'ValidationError',
    errors : {}
  };

  if(!req.body.session_id){
    isValid = false;
    validationError.errors.session_id = {message : 'Session Error' };
  }
  if(!req.body.documet_title){
    isValid = false;
    validationError.errors.documet_title = {message : 'Title is empty' };
  }
  if(!req.body.documet_content){
    isValid = false;
    validationError.errors.documet_content = {message : 'Content is empty' };
  }
  if(!req.body.signature_second){
    isValid = false;
    validationError.errors.signature_second = {message : 'Signature_second is empty' };
  }
  if(!req.body.signature_third){
    isValid = false;
    validationError.errors.signature_third = {message : 'Signature_third is empty' };
  }

  if(!isValid) return res.json(result.successFalse(validationError));
  else next();
}, function(req,res,next){
  var userSession = req.body.session_id;
  var documentTitle = req.body.documet_title;
  var documnetContent = req.body.documet_content;
  var questionCategory = req.body.category;
  var secondSign = req.body.signature_second;
  var thirdSign = req.body.signature_third;

});

/*
*show_document API
*Request
*document_id : Bring document's information at DB.
*Response
*document_title : Set document_title using document_id
*document_content : Set document_content using document_id
*document_date : Set document_date using document_id
*sugesstioner_id : Set sugesstioner_id using document_id
*document_state : Set document_state using document_id
*signature_second : Set second people to signature using document_id
*signature_third : Set third people to signature using document_id
*/
documents.get('/show_question',function(req,res,next){
  var isValid = true;
  var validationError = {
    name : 'ValidationError',
    errors:{}
  };

  if(!req.query.question_id){
    isValid = false;
    validationError.errors.question_id = {message:'404 Not Found'};
  }

  if(!isValid) return res.json(result.successFalse(validationError));
  else next();
},function(req,res,next){
  var questionNum = req.query.question_id;

});

/*
*documnet_list API
*Request
*sort_num : Not essentially request. division documents using sort_method
*department : Not essentially request. division documents using department
*document_state : Essentially request. division documents using document_state
*default : if user select default List, show all documents list.
*Response
*document_id : return document's id
*document_title : return document's id
*document_state : return document's state
*/
documents.get('/documnet_list',function(req,res,next){
  var isValid = true;
  var validationError = {
    name : 'ValidationError',
    errors : {}
  };

  if(!req.query.document_state){
    isValid = false;
    validationError.errors.document_state = { message : '404 Not Found'};
  }
  if(!req.query.default){
    isValid = false;
    validationError.errors.default = { message : '404 Not Found'};
  }
  if(!isValid) return res.json(result.successFalse(validationError));
  else next();
}, function(req,res,next){
  var documentState = req.query.document_state;
  var currentTime = new Date().getTime();
  var documentDefault = req.query.default;

  if(!req.query.department){
    var documentDepartment = 0;
  }
  else{
    var documentDepartment = req.query.department;
  }
  if(!req.query.sort_num){
    var documentSort = 0;
  }
  else{
    var documentSort = req.query.sort_num;
  }

});

/*
*approve_documnet API
*Request
*documnet_id : When user approve document, mark where user approve document.
*session_id : Mark who approve document.
*Response
*document_id : Show the modified document.
*/
documents.post('/approve_documnet', function(req,res,next){
  var isValid = true;
  var validationError = {
    name : 'ValidationError',
    errors : {}
  };
  if(!req.body.documnet_id){
    isValid = false;
    validationError.errors.documnet_id = { message : '404 Not Found'};
  }
  if(!req.body.session_id){
    isValid = false;
    validationError.errors.session_id = { message : 'Session Error'};
  }

  if(!isValid) return res.json(result.successFalse(validationError));
  else next();
}, function(req,res,next){
  var userSession = req.body.session_id;
  var documentNum = req.body.documnet_id;

});

/*
*deny_document API
*Request
*documnet_id : When user deny document, mark where user deny document
*session_id : Mark who deny document
*Response
*document_id : Show the modified document.
*/
documents.post('/deny_document', function(req,res,next){
  var isValid = true;
  var validationError = {
    name : 'ValidationError',
    errors : {}
  };

  if(!req.body.documnet_id){
    isValid = false;
    validationError.errors.documnet_id = { message : '404 Not Found'};
  }
  if(!req.body.session_id){
    isValid = false;
    validationError.errors.session_id = { message : 'Session Error'};
  }

  if(!isValid) return res.json(result.successFalse(validationError));
  else next();
}, function(req,res,next){
  var userSession = req.body.session_id;
  var documentNum = req.body.documnet_id;

});

module.exports = documents;
