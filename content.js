var svgsym = document.body.querySelector('svg > symbol');
var navul = document.body.querySelector('nav#top-navigation > ul');
var entryfooter = document.body.querySelectorAll(
  '#topic > ul#entry-item-list > li > footer > .feedback'
);
console.log('asd');
svgsym.insertAdjacentHTML(
  'beforebegin',
  '<symbol id="icon-bookmark" viewBox="0 0 32 32"><title>bookmark</title><path d="M6 0v32l10-10 10 10v-32z"></path></symbol>'
);
navul.insertAdjacentHTML(
  'afterbegin',
  '<li class="bookmarks"><a href="#" id="bookmarks-modal-btn" title="yer-isaretleri"><svg class="eksico" style="fill:#2d2d2d;stroke-width:2px;stroke:#bdbdbd"><use xlink:href="#icon-bookmark"></use></svg>yer isaretleri</a></li>'
);
for (var i = 0; i < entryfooter.length; i++) {
  entryfooter[i].insertAdjacentHTML(
    'beforeend',
    '<span class="bookmark" style="margin-left: 5px;"><a class="bookmark-link" title="yerimi ekle" aria-label="yerimi ekle"><svg class="icon eksico"><use xlink:href="#icon-bookmark"></use></svg></a></span>'
  );
}

document.body.insertAdjacentHTML(
  'afterbegin',
  '<div id="BookmarksModal" class="bookmark-modal"><div class="modal-content"><span class="bookmarks-modal-close">&times;</span><p>Some text in the Modal..</p></div></div>'
);

// Get the modal
var modal = document.getElementById('BookmarksModal');

// Get the button that opens the modal
var btn = document.getElementById('bookmarks-modal-btn');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('bookmarks-modal-close')[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
