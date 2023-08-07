'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML)
}
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
  optArticleTagSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

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
   // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //dodanie szablonu zamist linku powyżej 
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into titleList */

    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

/* Start calculateTagsParams function*/

const calculateTagsParams = function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    } else if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  console.log(params);
  return params;
};

const calculateTagClass = function (count, params) {
  //miejsce na napisanie funkcji
  const normalizedCount = count - params.min; //3
  const normalizedMax = params.max - params.min; // 8
  const percentage = normalizedCount / normalizedMax; //0,375
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1); //2

  return optCloudClassPrefix + classNumber;
};

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector); // wyszukuje wszystkie artykuły
  console.log(articles);
  /* START LOOP: for every article: */

  for (let article of articles) {
    /* find tags wrapper */
    const wrapperTags = article.querySelector(optArticleTagSelector);
    console.log(wrapperTags); // wyszukje ul w których w środku są tagi wybierane

    /* make html variable with empty string */

    let html = ' '; // przygotwowuje miejsce pod wrzucenie linka z tagiem (stringa)

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

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
      console.log(linkHTML);
    }

    /* insert HTML of all the links into the tags wrapper */

    wrapperTags.innerHTML = html;

    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams); // tutaj zlicza ile jest max i ile min tagów

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */ //poprawiony kod przez mentora poniżej, błąd w kursie Kodilla
    const tagLinkHtml =
      '<li><a class="' +
      calculateTagClass(allTags[tag], tagsParams) +
      '" href="#tag-' +
      tag +
      '"><span>' +
      tag + '</span></a></li>';

    allTagsHTML += tagLinkHtml;

    /* [NEW] END LOOP: for each tag in allTags: */
  }
  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
  console.log(allTagsHTML);
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
  const links = document.querySelectorAll('[href^="#tag-"]'); //[] - że zawiera, atrybut href, ^ który zaczyna się od od znaków #tag , noi stringi dodajemy w ""
  console.log(links);

  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
};
addClickListenersToTags();

/* START author funkction links - końcówka zadania 7.2*/

const generateAuthors = function () {
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find author wrapper */

    const authorWraper = article.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */
    // let html = ''; nie potrzebne bo 1 autor

    /* get tags from data-author attribute */

    const articleAuthor = article.getAttribute('data-author');
    articleAuthor;

    /* generate HTML of the link */

    const authorHTML =
      '<a href="#author-' +
      articleAuthor +
      '"><span>' +
      '<strong>Author: </strong>' +
      ' ' +
      articleAuthor +
      '</span></a>';

    /* check if this link is NOT already in allAuthors */

    if (!allAuthors[articleAuthor]) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

    /* add generated code to html variable */
    console.log(authorHTML);

    authorWraper.innerHTML = authorHTML;
  }
  /*find list of authors in right column */
  const authorList = document.querySelector(optAuthorsListSelector);

  /* [NEW] create variable for all links HTML code */
  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each tag in allAuthors: */
  for (let author in allAuthors) {
    const linkHTML =
      '<li><a href="#author-' +
      author +
      '"<span>' +
      ' ' +
      author +
      '</span>  (' +
      allAuthors[author] +
      ') </a></li>';

    allAuthorsHTML += linkHTML;
  }
  authorList.innerHTML = allAuthorsHTML;
};
generateAuthors();

const authorClickHandler = function (event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all tag links with class active */
  const activeAuthorslinks = document.querySelectorAll(
    'a.active[href^="#author-"]'
  );

  /* START LOOP: for each active author link */

  for (let activeAuthorlink of activeAuthorslinks) {
    /* remove class active */
    activeAuthorlink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const allAuthorsLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for (let authorLink of allAuthorsLinks) {
    /* add class active */
    authorLink.classList.add('active');
    /* END LOOP: for each found author link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
};
const addClickListenersToAuthors = function addClickListenersToAuthor() {
  /* find all links to author */
  const links = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }
};
addClickListenersToAuthors();
