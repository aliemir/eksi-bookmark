var bookmarks = [];
var entry_url = 'https://eksisozluk.com/entry/';

function injectHtml() {
  var svgsym = document.body.querySelector('svg > symbol');
  var navul = document.body.querySelector('nav#top-navigation > ul');
  var entryfooter = document.body.querySelectorAll(
    '#topic > ul#entry-item-list > li > footer > .feedback'
  );
  svgsym.insertAdjacentHTML(
    'beforebegin',
    '<symbol id="icon-bookmark" viewBox="0 0 32 32"><title>bookmark</title><path d="M6 0v32l10-10 10 10v-32z"></path></symbol><symbol id="icon-bin" viewBox="0 0 32 32"><title>bin</title><path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path><path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path></symbol>'
  );
  navul.insertAdjacentHTML(
    'afterbegin',
    '<li class="bookmarks"><span id="bookmarks-modal-btn" title="yer-isaretleri"><svg class="eksico bookmarks-modal-icon"><use xlink:href="#icon-bookmark"></use></svg>yer isaretleri</span></li>'
  );
  for (var i = 0; i < entryfooter.length; i++) {
    if (
      bookmarks
        .map(function(e) {
          return e.entry_id;
        })
        .indexOf(
          entryfooter[i].parentNode.parentNode.getAttribute('data-id')
        ) == -1
    ) {
      entryfooter[i].insertAdjacentHTML(
        'beforeend',
        '<span class="bookmark" style="float:right;"><a class="bookmark-link" title="yerimi ekle" aria-label="yerimi ekle"><svg class="icon eksico"><use xlink:href="#icon-bookmark"></use></svg></a></span>'
      );
    } else {
      entryfooter[i].insertAdjacentHTML(
        'beforeend',
        '<span class="bookmark" style="float:right;"><a class="bookmark-link favorited" title="yerimi ekle" aria-label="yerimi ekle"><svg class="icon eksico"><use xlink:href="#icon-bookmark"></use></svg></a></span>'
      );
    }
  }
  document.body.insertAdjacentHTML(
    'afterbegin',
    '<div id="BookmarksModal" class="bookmark-modal"><div class="bm-modal-content"><span class="bookmarks-modal-close">×</span><h1>Yer isaretlerim</h1><div class="bookmark-listesi"><ul class="bookmark-ul"></ul></div></div></div>'
  );
  var modal_liste_ul = document.querySelector(
    '.bookmark-listesi > .bookmark-ul'
  );
  for (var i = 0; i < bookmarks.length; i++) {
    var li_string =
      '<li id="' +
      bookmarks[i].id +
      '" entry_id="' +
      bookmarks[i].entry_id +
      '"><span class="bm-title">' +
      bookmarks[i].title +
      '</span><span class="bookmark-sil"><svg class="icon eksico bookmark-sil-icon"><use xlink:href="#icon-bin"></use></svg></span><span class="bm-info-small"><span class="bm-author">' +
      bookmarks[i].author +
      '</span><span class="bm-entry-id">(#' +
      bookmarks[i].entry_id +
      ')</span></span></li>';
    modal_liste_ul.insertAdjacentHTML('afterbegin', li_string);
  }
}

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

loadListFromLocalStorage();
injectHtml();

var entry_bookmark_click = function(buton) {
  return function() {
    var entry_ids = bookmarks.map(function(el) {
      return el.entry_id;
    });
    if (
      entry_ids.indexOf(
        buton.parentNode.parentNode.parentNode.parentNode.getAttribute(
          'data-id'
        )
      ) != -1
    ) {
      removeBookmarkFromList(
        buton.parentNode.parentNode.parentNode.parentNode.getAttribute(
          'data-id'
        )
      );
      buton.classList.remove('favorited');
      return;
    }
    var bm = {
      id: Date.now(),
      title: document.title.split(' - ')[0],
      entry_id: buton.parentNode.parentNode.parentNode.parentNode.getAttribute(
        'data-id'
      ),
      author: buton.parentNode.parentNode.parentNode.parentNode.getAttribute(
        'data-author'
      )
    };
    addBookmarkToList(bm);
    buton.classList.add('favorited');
  };
};

var entry_butonlari = document.querySelectorAll('a.bookmark-link');
for (var i = 0; i < entry_butonlari.length; i++) {
  var buton = entry_butonlari[i];
  buton.onclick = entry_bookmark_click(buton);
}

// Modal Open-Close
var modal = document.getElementById('BookmarksModal');
var modal_btn = document.getElementById('bookmarks-modal-btn');
var modal_close_span = document.getElementsByClassName(
  'bookmarks-modal-close'
)[0];

modal_btn.onclick = function() {
  modal.style.display = 'block';
};

modal_close_span.onclick = function() {
  modal.style.display = 'none';
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
//////

//Modal-List Click
var list_item = document.querySelectorAll(
  '#BookmarksModal .bm-modal-content .bookmark-ul li'
);
var list_item_title_click = function(item) {
  return function() {
    window.location.href = entry_url + item.parentNode.getAttribute('entry_id');
  };
};
var list_item_remove_click = function(item) {
  return function() {
    removeBookmarkFromList(item.parentNode.getAttribute('entry_id'));
    item.parentNode.style.display = 'none';
  };
};
for (var i = 0; i < list_item.length; i++) {
  var item_title = list_item[i].querySelector('.bm-title');
  var item_bin = list_item[i].querySelector('.bookmark-sil');
  item_title.onclick = list_item_title_click(item_title);
  item_bin.onclick = list_item_remove_click(item_bin);
}
//////
