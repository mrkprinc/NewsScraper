$(document).ready(function() {
  const articleTemplate = Handlebars.templates['article'];
  const newArticleTemplate = Handlebars.templates['new-article'];
  const notesTemplate = Handlebars.templates['notes'];
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

  $('#articles-section').on('click', '.note-button', function() {
    getNotes($(this).attr('data-id'));
  })

  $('#notes-section').on('click', '.addNote-button', function() {
    let text = $(this).siblings('textarea').val().trim();
    let articleId = $(this).parent().attr('data-articleId');
    if(text) {
      $.post('/notes', {body: {body: text}, article: articleId}, result => {
        if(result._id) {
          getNotes(articleId);
        }
      })
    }

  })

  function scrapeNew() {
    $.ajax({
      method: 'GET',
      url: '/scrape'
    }).then(response => {
      let newArticles = [];
      response.forEach(result => {
        if(!urls[result.url]) {
          result.createdAt = Date.now();
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

  function getNotes(id) {
    $.ajax({
      method: 'GET',
      url: `/notes/${id}`
    }).then(response => {
      $('#notes').html(notesTemplate(response));
    })
  }
})
