const { SearchDialog } = require('botfuel-module-facetedsearch');
const ArticleDb = require('../dbs/article-db');

class ArticleDialog extends SearchDialog {}

ArticleDialog.params = {
  namespace: 'article',
  db: ArticleDb,
  entities: {
    type: {
      dim: 'type',
      priority: 10,
    },
    brand: {
      dim: 'brand',
      priority: 9,
    },
    size: {
      dim: 'size',
      priority: 5,
    },
    sleeve: {
      dim: 'sleeve',
      priority: 1,
    },
    vcv: {
      dim: 'vcv',
      priority: 2,
    },
    color: {
      dim: 'color',
    },
    form: {
      dim: 'form',
    },
  },
};

module.exports = ArticleDialog;
