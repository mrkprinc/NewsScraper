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
      $('#articles-section').append(`<p class='article'>${result.headline}</p>`);
    })
  })
})
