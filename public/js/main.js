$(document).ready(function() {
  console.log(Handlebars.templates['article']);
  document.write(Handlebars.templates['article']({}))
})
