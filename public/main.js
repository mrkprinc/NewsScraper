$(document).ready(function() {
  const articleTemplate = Handlebars.templates['article'];
  const newArticleTemplate = Handlebars.templates['new-article'];
  let urls = {};

  $.ajax({
    method: 'GET',
    url: '/recent-articles'
  }).then(response => {
    $('#old-articles').empty();
    response.forEach(result => {
      urls[result.url] = true;
      $('#old-articles').append(articleTemplate(result));
    })
    scrapeNew();
  })

  function scrapeNew() {
    $.ajax({
      method: 'GET',
      url: '/scrape'
    }).then(response => {
      let newArticles = [];
      response.forEach(result => {
        if(!urls[result.url]) {
          newArticles.push(result);
        }
      })
      $('#new-articles').empty();
      if(newArticles.length) {
        $.post('/scrape', {articles: newArticles}, result => {
          result.forEach(article => {
            $('#new-articles').append(newArticleTemplate(article));
          })
        })
      } else console.log('no new articles');
    })
  }
})
