var bookmarks = [];
var bookmark = function(title, entry_id, author) {
  this.id = Date.now();
  this.title = title;
  this.entry_id = entry_id;
  this.author = author;
};
var entry_url = 'https://eksisozluk.com/entry/';

function saveListToLocalStorage() {
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
function loadListFromLocalStorage() {
  bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
}
function addBookmarkToList(bm) {
  bookmarks.push(bm);
  saveListToLocalStorage();
}
function removeBookmarkFromList(entry_id) {
  bookmarks = bookmarks.filter(function(el) {
    return el.entry_id !== entry_id;
  });
  saveListToLocalStorage();
}
function injectHtml() {
  var svg_select = document.body.querySelector('svg > symbol');
  var top_nav_select = document.body.querySelector('nav#top-navigation > ul');
  //Inser SVG's
  svg_select.insertAdjacentHTML(
    'beforebegin',
    '<symbol id="icon-bookmark" viewBox="0 0 32 32"><title>bookmark</title><path d="M6 0v32l10-10 10 10v-32z"></path></symbol><symbol id="icon-bin" viewBox="0 0 32 32"><title>bin</title><path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path><path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path></symbol>'
  );
  //Insert Header Button
  top_nav_select.insertAdjacentHTML(
    'afterbegin',
    '<li class="bookmarks"><span id="bookmarks-modal-btn" title="yer-isaretleri"><svg class="eksico bookmarks-modal-icon"><use xlink:href="#icon-bookmark"></use></svg>yer isaretleri</span></li>'
  );
  //Insert Modal
  document.body.insertAdjacentHTML(
    'afterbegin',
    '<div id="BookmarksModal" class="bookmark-modal"><div class="bm-modal-content"><span class="bookmarks-modal-close">×</span><h1>Yer isaretlerim</h1><ul class="bookmark-ul"></ul></div></div>'
  );
  //Populate List
  updateListHtml();
  //"Add To Bookmarks" button to entries
  addButtonsToEntries();
}
function updateListHtml() {
  var modal_liste_ul = document.querySelector('.bm-modal-content .bookmark-ul');
  var list_string = '';
  for (var i = 0; i < bookmarks.length; i++) {
    var li_string = `<li id="${bookmarks[i].id}" entry_id="${
      bookmarks[i].entry_id
    }"><span class="bm-title">${
      bookmarks[i].title
    }</span><span class="bookmark-sil"><svg class="icon eksico bookmark-sil-icon"><use class="bookmark-sil-icon-use" xlink:href="#icon-bin"></use></svg></span><span class="bm-info-small"><span class="bm-author">${
      bookmarks[i].author
    }</span><span class="bm-entry-id">(#${
      bookmarks[i].entry_id
    })</span></span></li>`;
    list_string = li_string + list_string;
  }
  modal_liste_ul.innerHTML = list_string;
}
function alreadyInTheList(entry_id) {
  if (
    bookmarks
      .map(function(e) {
        return e.entry_id;
      })
      .indexOf(entry_id) == -1
  ) {
    return false;
  } else {
    return true;
  }
}
function addButtonsToEntries() {
  var entryfooter = document.body.querySelectorAll(
    '#topic > ul#entry-item-list > li > footer > .feedback'
  );
  entryfooter.forEach(el => {
    if (!alreadyInTheList(el.parentNode.parentNode.getAttribute('data-id'))) {
      el.insertAdjacentHTML(
        'beforeend',
        '<span class="bookmark-link"><svg class="icon eksico bookmark-link-icon-svg"><use class="bookmark-link-icon" xlink:href="#icon-bookmark"></use></svg></span>'
      );
    } else {
      el.insertAdjacentHTML(
        'beforeend',
        '<span class="bookmark-link favorited"><svg class="icon eksico bookmark-link-icon-svg"><use class="bookmark-link-icon" xlink:href="#icon-bookmark"></use></svg></span>'
      );
    }
  });
}
function modalFunctions() {
  var modal = document.getElementById('BookmarksModal');
  var modal_btn = document.getElementById('bookmarks-modal-btn');
  var modal_close_span = document.getElementsByClassName(
    'bookmarks-modal-close'
  )[0];
  modal_btn.onclick = function() {
    updateListHtml();
    modal.style.display = 'flex';
  };
  modal_close_span.onclick = function() {
    modal.style.display = 'none';
  };
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}

loadListFromLocalStorage();
injectHtml();
modalFunctions();

document.querySelector('.bm-modal-content').onclick = function(e) {
  console.log(e.target);
  if (e.target.classList.contains('bm-title') == true) {
    window.location.href =
      entry_url + e.target.parentNode.getAttribute('entry_id');
  } else if (
    e.target.classList.contains('bookmark-sil') == true ||
    e.target.classList.contains('bookmark-sil-icon') == true ||
    e.target.classList.contains('bookmark-sil-icon-use')
  ) {
    var item = e.target;
    if (e.target.classList.contains('bookmark-sil-icon') == true) {
      item = item.parentNode;
    }
    if (e.target.classList.contains('bookmark-sil-icon-use')) {
      item = item.parentNode.parentNode;
    }
    removeBookmarkFromList(item.parentNode.getAttribute('entry_id'));
    item.parentNode.style.display = 'none';
  }
};
document.querySelector('#entry-item-list').onclick = function(e) {
  var item = e.target;
  if (
    item.classList.contains('bookmark-link') == true ||
    item.classList.contains('bookmark-link-icon') == true ||
    item.classList.contains('bookmark-link-icon-svg') == true
  ) {
    if (item.classList.contains('bookmark-link-icon') == true) {
      item = item.parentNode.parentNode;
    }
    if (item.classList.contains('bookmark-link-icon-svg') == true) {
      item = item.parentNode;
    }
    if (item.classList.contains('bookmark-link') == true) {
      item = item;
    }
    var current = item.parentNode.parentNode.parentNode;

    if (alreadyInTheList(current.getAttribute('data-id'))) {
      removeBookmarkFromList(current.getAttribute('data-id'));
      item.classList.remove('favorited');
    } else {
      var b = new bookmark(
        document.title.split(' - ')[0],
        current.getAttribute('data-id'),
        current.getAttribute('data-author')
      );
      addBookmarkToList(b);
      item.classList.add('favorited');
    }
  }
};
