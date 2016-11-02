/**
 * QuQuiz.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
_config: {
    populate:true
  },
  attributes: {
Duree: 'INTEGER',Date:'DATE',Niveau: 'INTEGER',Module:'STRING',Questions: {
      collection: 'Question',
      via: 'Quiz',
      dominant: true
    }
  }
};


