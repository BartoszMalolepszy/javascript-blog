'use strict';
const titleClickHandler = function (event) {
  console.log('Link was clicked!');
  event.preventDefault();

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  const clickedElement = this;
  console.log('clickedElement (with plus): ' + clickedElement);

  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */

  const acitveArticles = document.querySelectorAll('.active');
  console.log(acitveArticles);

  for (let acitveArticle of acitveArticles) {
    acitveArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagSelector = '.post-tags .list';

function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );

  let html = '';

  for (let article of articles) {
    /* get the article id */

    const articleId = article.getAttribute('id');

    /* find the title element  and  get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';

    /* insert link into titleList */

    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
const links = document.querySelectorAll('.titles a');
console.log(links);

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

generateTitleLinks();

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector); // wyszukuje wszystkie artykuły
  console.log(articles);
  /* START LOOP: for every article: */

  for (let article of articles) {
    /* find tags wrapper */
    const wrapperTags = article.querySelector(optArticleTagSelector);
    console.log(wrapperTags); // wyszukje ul w których w środku są tagi wybierane

    /* make html variable with empty string */

    let html = ' '; // przygotwowuje miejsce pod wwrzucenie linka z tagiem (stringa)

    /* get tags from data-tags attribute */

    const articelTags = article.getAttribute('data-tags'); // pobieram wszystkie tagi z poszczegłnych art
    console.log(articelTags);

    /* split tags into array */
    const articelTagsArray = articelTags.split(' ');
    console.log(articelTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articelTagsArray) {
      /* generate HTML of the link */

      const linkHTML =
        '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

      /* add generated code to html variable */

      html = html + linkHTML;

      /* END LOOP: for each tag */
      console.log(linkHTML);
    }

    /* insert HTML of all the links into the tags wrapper */

    wrapperTags.innerHTML = html;

    /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* find all tag links with class active */
  const allActiveTagsLinks = document.querySelectorAll(
    'a.active[href^="#tag-"]'
  ); // klasa z scss więc . musi być
  console.log(allActiveTagsLinks);

  /* START LOOP: for each active tag link */
  for (const activeTagLink of allActiveTagsLinks) {
    /* remove class active */
    activeTagLink.classList.remove('active');

    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagsLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let tagLink of allTagsLinks) {
    /* add class active */
    tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

//tagClickHandler();

const addClickListenersToTags = function () {
  /* find all links to tags */
  const links = document.querySelectorAll('.post-tags a');
  console.log(links);

  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
};
addClickListenersToTags();

