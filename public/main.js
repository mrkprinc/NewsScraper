$(document).ready(function() {
  const articleTemplate = Handlebars.templates['article'];
  const newArticleTemplate = Handlebars.templates['new-article'];
  let urls = {};

  $.ajax({
    method: 'GET',
    url: '/recent-articles'
  }).then(response => {
    $('#articles-section').empty();
    response.forEach(result => {
      urls[result.url] = true;
      // TEMP
      $('#articles-section').append(articleTemplate(result));
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
      if(newArticles.length) {
        $.post('/scrape', {articles: newArticles}, (err, result) => {
          if(err) console.log(err);
        })
        newArticles.forEach(article => {
          // TEMP
          $('#articles-section').prepend(newArticleTemplate(article));
        })
      } else console.log('no new articles');
    })
  }
})
