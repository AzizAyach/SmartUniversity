/**
 * QuQuizController
 *
 * @description :: Server-side logic for managing Ququizs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs');
var pdf = require('html-pdf');

module.exports = {

	index: function (req, res) {
    res.view('Smart/index', {
        title: "Quiz"
    });
  },
  creating: function (req,res,next) {
  	var id ;
  	var module = req.param('Module');
Question.find({Module: module}).exec(function(err,ques) {
for(i=0; i < ques.length;i++){
 console.log("SETTING DEFAULT ", ques.id);
req.param.Questions = [ques.id];
}



});


QuQuiz.create ( req.params.all(),function QuQuizcreate(err,QuQuiz){
if(err) return next(err);
id = QuQuiz.id;
console.log(id);
});
},
findAllQuiz:function (req,res,next){
QuQuiz.find().populate('Questions').populateAll().exec(function (err, quiz) {
  if (err) {

    return;
  }

return res.json(quiz);
});
},
deleteQuiz:function(req,res,next){
 var id = req.param('id');
        if (!id) {
            return res.badRequest('No id provided.');
        }

        QuQuiz.findOne(id).exec(function(err, result) {
            if (err) return res.serverError(err);

            if (!result) return res.notFound();

            QuQuiz.destroy(id, function (err) {

                if (err) return next (err);

                return res.json(result);
            });

        });
},
updateQuiz:function(req,res,next){
var id = req.param('id');
        if (!id) {
            return res.badRequest('No id provided.');
        }

        QuQuiz.findOne(id).exec(function(err, result) {
            if (err) return res.serverError(err);

            if (!result) return res.notFound();

          return res.json(result);

        });



},
attributQuestion:function(req,res,next){
var id = req.param('id');
var array = [] ;
var item = [];
 var aletoire ;
QuQuiz.findOne(id).populateAll().exec(function(err, result) {

	res = result;
//console.log(result.id);
Question.find({Module: result.Module , Niveau: result.Niveau}).exec(function(err,ques) {
for(i=0; i < ques.length;i++){
 //console.log("SETTING DEFAULT ", ques[i].id);
  array.push(ques[i].id);
}


 for(i=0;i<10;i++){
 aletoire = array[Math.floor(Math.random()*array.length)];

if(item.indexOf(aletoire)==-1){
	item.push(aletoire);
	console.log("Oui");
}
else{

console.log("NoN");

}

}

result.Questions.add(item);
console.log(item.length);

 result.save(function(err) {});
});



  });

 return res.send('Smart/Quiz');
},
afficherQuiz:function(req,res,next){
var id = req.param('id');

var ch ;
        if (!id) {
            return res.badRequest('No id provided.');
        }

 QuQuiz.findOne(id).populateAll().exec(function(err ,result) {

            if (err) return res.serverError(err);

            if (!result) return res.notFound();
 var c = parseInt(result.Questions.length,10);
 //console.log(result.Questions);
  var Ques = [];
var cpt = 0;
  // console.log(result[0].Questions);
for (i=0; i<c; i++) {
    Question.find({id:result.Questions[i].id}).populate('Reponses').populate('Quiz').exec(function(err,quest_info) {

        cpt++;

        Ques.push(quest_info);
        if (cpt === c) {
        var q = JSON.stringify(Ques);
          result.Questions = q;
           console.log(result);
           return res.send(Ques);
        }



    });

  }




        });



},

  gotoQuiz:function (req, res) {
     var id =   req.param('id');

    console.log('its'+id);
    res.view('Smart/QuizDiplay',{id: id, layout: null});
  },


  pdfgenerate:function(req,res,next){
      var id = req.param('id');
      var Ques = [];
      var cpt = 0;
    var question = [];
    if (!id) {
        return res.badRequest('No id provided.');
      }

      QuQuiz.findOne(id).populateAll().exec(function(err ,result) {

        if (err) return res.serverError(err);

        if (!result) return res.notFound();
        var c = parseInt(result.Questions.length,10);
        //console.log(result.Questions);

        // console.log(result[0].Questions);
        for (i=0; i<c; i++) {
          Question.find({id:result.Questions[i].id}).populate('Reponses').populate('Quiz').exec(function(err,quest_info) {

            cpt++;

            Ques.push(quest_info);
            if (cpt === c) {
              var jsonobject = Ques;

              for (var i=0;i<jsonobject.length;i++)

              {
                var table_rep = [];
                var quest = {question: "", choices: ""}
                var q = jsonobject[i];
                var que = q[0];
                var titre = que.Titre;
                quest.question= titre;


                var  rep = que.Reponses;

                for(var j=0; j<rep.length;j++)
                {
                  var ty = rep[j].Type;
                  if(ty==true){
                     table_rep.push(rep[j].Reponse);
                  }

                }
                quest.choices = table_rep;
                question.push(quest);
              }

              console.log(question);

              var html = '<html><!DOCTYPE html><html><head></head><body><h1 style="">Correction QCM</h1>';
                 for(var k =0 ; k<question.length;k++)
                 {
                      html+='<h2>'+question[k].question+'</h2><br>';

                       for(var n =0; n<question[k].choices.length;n++){
                         html+='<p>'+question[k].choices[n]+'</p>';

                       }


                 }
html+='</body>'

              pdf.create(html).toFile('./'+id+'.pdf', function(err, resp) {
                if (err) return console.log(err);
                console.log(resp.filename);
                return res.redirect(resp.filename);  // { filename: '/app/businesscard.pdf' }
              });
            }



          });

        }

      });


    }

  };

