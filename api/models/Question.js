/**
 * Question.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
_config: {
    populate:true
  },
  attributes: {
     Niveau:'INTEGER',Titre:'STRING',Module:'STRING',Quiz: {
      collection: 'QuQuiz',
      via: 'Questions'
    }
    ,Reponses: {
      collection: 'Reponse',
      via: 'Quest',
       dominant: true
    }
  }
};
