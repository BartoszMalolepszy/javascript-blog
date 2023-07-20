'use strict';
const titleClickHandler = function (event) {
  console.log('Link was clicked!');
  const activeLinks = document.querySelectorAll('.titles a.active');
  console.log('activeLinks', activeLinks);

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  const clickedElement = this;
  console.log('clickedElement (with plus): ' + clickedElement);

  clickedElement.classList.add('active');

  const acitveArticles = document.querySelectorAll('.active');

  for (let acitveArticle of acitveArticles) {
    acitveArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  const targetArticle = document.querySelector(articleSelector);

  targetArticle.classList.add('active');
};
const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}
