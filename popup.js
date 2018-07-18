//
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

var li_string = `<li id="${bookmarks[i].id}" entry_id="${
  bookmarks[i].entry_id
}"><span class="bm-title">${
  bookmarks[i].title
}</span><span class="bookmark-sil"><svg class="icon eksico bookmark-sil-icon"><use xlink:href="#icon-bin"></use></svg></span><span class="bm-info-small"><span class="bm-author">${
  bookmarks[i].author
}</span><span class="bm-entry-id">(#${
  bookmarks[i].entry_id
})</span></span></li>`;
