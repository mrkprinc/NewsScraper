$(document).ready(function() {
  const articleTemplate = Handlebars.templates['article'];
  let urls = {};

  $.ajax({
    method: 'GET',
    url: '/recent-articles'
  }).then(response => {
    $('#articles-section').empty();
    response.forEach(result => {
      urls[result.url] = true;
      // TEMP
      $('#articles-section').append(`<p class='article'>${result.headline}</p>`);
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
        $.post('/scrape', newArticles, (err) => {
          if(err) return console.log(err);
          console.log('post successful');
        })
        newArticles.forEach(article => {
          $('#articles-section').prepend(`<p class='article'>*NEW ${article.headline}</p>`);
        })
      } else console.log('no new articles');
    })
  }
})
