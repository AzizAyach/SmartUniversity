/**
 * QuestionController
 *
 * @description :: Server-side logic for managing Questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
_config: {
    populate:true
  },
creating: function (req,res,next) {
Question.create ( req.params.all(),function QuQuizcreate(err,Qu){
if(err) return next(err);
res.json(Qu);
});
},
findAllQuestion:function (req,res,next){
Question.find().exec(function (err, q) {
  if (err) {

    return;
  }

return res.json(q);
});
}	,
  deleteQuestion:function(req,res,next){
    var id = req.param('id');
    console.log(id);
    if (!id) {
      return res.badRequest('No id provided.');
    }

    Question.findOne(id).exec(function(err, result) {
      if (err) return res.serverError(err);

      if (!result) return res.notFound();

      Question.destroy(id, function (err) {

        if (err) return next (err);

        return res.json(result);
      });

    });
  }
  
  
};

