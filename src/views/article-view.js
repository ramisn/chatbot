const _ = require('lodash');
const { BotTextMessage, Logger, QuickrepliesMessage, WebAdapter } = require('botfuel-dialog');
const { SearchView } = require('botfuel-module-facetedsearch');

const logger = Logger('ArticleView');

const questions = {
  type: 'What is your VCV Number?',
  // brand: 'Which brand do you like?',
  // color: 'What color do you like?',
  size: 'Which VCV you want to know?',
  // form: 'Which form do you like?',
  // sleeve: 'What about sleeves?',
  vcv: 'Which VCV you want to Know?'
};

const getBotResponse = (facet, valueCounts) => {
  let facetValues = [];
  if (facet === 'size') {
    // size value is array like 'S,M,L'
    const array = valueCounts.map(o => o.value.split(','));
    facetValues = _.union(...array);
  } else {
    facetValues = valueCounts.map(o => o.value);
  }

  return [new BotTextMessage(questions[facet]), new QuickrepliesMessage(facetValues)];
};

const articleHtml = (data) => {
  let html = '<div>';
  html += `<div>VCV : <strong>${data.vcv}</strong></div>`;
  html += `<div>1. Vehicle currently at: <strong>${data.location}</strong></div>`;
  html += `<div>2. Origin of the VCV: <strong>${data.origin}</strong></div>`;
  html += `<div>3. Destination: <strong>${data.dest}</strong></div>`;
  html += `<div>4. ETA for this: <strong>${data.eta}</strong></div>`;
  html += `<div>5. Is there a deviation from path?: <strong>${data.devia}</strong></div>`;
  html += `<div>6. Vehicle number: <strong>${data.vno} </strong></div>`;
  html += `<div>7. Transit time: <strong>${data.tt}</strong></div>`;
  html += `<div>8. Time is left for arrival: <strong>${data.tl}</strong></div>`;
  html += `<div>9. Distance left: <strong>${data.dl}</strong></div>`;
  html += `<div>10. Route code: <strong>${data.rc}</strong></div>`;
  // html += `<div><img src="${WebAdapter.getStaticUrl(data.link)}"></div>`;
  html += `<div>https://www.google.com/maps/?q=${data.lat},${data.lon}</div>`;
  // html += `<div><strong>${data.brand}</strong> <strong style="float:right">${
  //   data.price
  // } €</strong></div>`;
  // html += `<div>${data.size}</div>`;
  // html += `<div>${data.eta}</div>`;
  // html += `<div>${data.reveta}</div>`;
  // html += `<div>${data.vcv}</div>`;
  // if (data.cut) {
  //   html += `<div>${data.cut}</div>`;
  // }

  // if (data.material) {
  //   html += `<div>${data.material}</div>`;
  // }
  html += '</div>';
  return html;
};

class ArticleView extends SearchView {
  render(userMessage, { matchedEntities, missingEntities, data, facetValueCounts }) {
    logger.debug('render', {
      matchedEntities,
      missingEntities,
      data,
      facetValueCounts,
    });

    if (missingEntities.size !== 0) {
      return getBotResponse(missingEntities.keys().next().value, facetValueCounts);
    }

    const messages = [];
    if (data && data.length > 0) {
      messages.push(new BotTextMessage(`Thank you. We have ${data.length} VCV${data.length > 1 ? 's' : ''}:`));
      _.forEach(data, (d) => {
        messages.push(new BotTextMessage(articleHtml(d)));
      });
    } else {
      messages.push(new BotTextMessage("Sorry we don't find any result!"));
    }
    return messages;
  }
}

module.exports = ArticleView;
