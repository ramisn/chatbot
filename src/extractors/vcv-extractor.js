const { CorpusExtractor, FileCorpus } = require('botfuel-dialog');

class VcvExtractor extends CorpusExtractor {
  constructor() {
    super({
      dimension: 'vcv',
      corpus: new FileCorpus(`${__dirname}/../corpora/vcv.txt`),
      options: {},
    });
  }
}

module.exports = VcvExtractor;
