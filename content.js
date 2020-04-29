let bookmarks = [];

const bookmark = function(title, entry_id, author) {
  this.id = Date.now()
  this.title = title
  this.entry_id = entry_id
  this.author = author
};

const entry_url = 'https://eksisozluk.com/entry/'

const saveToLocalStorage = () => {
  localStorage.setItem('eksi-bookmarks', JSON.stringify(bookmarks))
}

const loadFromLocalStorage = () => {
  const bs = JSON.parse(localStorage.getItem('eksi-bookmarks'))
  if(bs) {
    bookmarks = [...bs]
  } else {
    bookmarks = []
  }
}

const renderList = () => {
  const modal_liste_ul = document.querySelector('.bm-modal-content .bookmark-ul')

  const itemHTML = ({id, entry_id, title, author}) => {
    return `
      <li id="${id}" entry_id="${entry_id}">
        <span class="bm-title">
          ${title}
        </span>
        <span class="bookmark-sil">
          <svg class="icon eksico bookmark-sil-icon"><use class="bookmark-sil-icon-use" xlink:href="#icon-bin"></use></svg>
        </span>
        <span class="bm-info-small">
          <span class="bm-author">
            @${author}
          </span>
          <span class="bm-entry-id">
            #${entry_id}
          </span>
        <span>
      </li>
    `
  }

  const list = bookmarks.map(b => itemHTML(b))
  modal_liste_ul.innerHTML = list.join("");
}

const addBookmark = (bm) => {
  bookmarks.push(bm)
  saveToLocalStorage()
}

const removeBookmark = (entry_id) => {
  const index = bookmarks.findIndex(b => b.entry_id === entry_id)
  bookmarks.splice(index,1);
  saveToLocalStorage()
}

const isBookmarked = (entry_id) => {
  const index = bookmarks.findIndex(b => b.entry_id === entry_id)
  if(index !== -1) {
    return true
  } else {
    return false
  }
}

const toggleBookmark = (bm) => {
  if(isBookmarked(bm.entry_id)) {
    removeBookmark(bm.entry_id)
  } else {
    addBookmark(bm)
  }
}

const addButtonsToEntries = () => {
  const entryfooters = document.body.querySelectorAll(
    '#topic > ul#entry-item-list > li > footer > .feedback'
  );
  
  entryfooters.forEach(el => {
    const entry_id = el.parentNode.parentNode.getAttribute('data-id')
    if(!isBookmarked(entry_id)) {
      el.insertAdjacentHTML(
        'beforeend',
        `<span class="bookmark-link"><svg class="icon eksico bookmark-link-icon-svg"><use class="bookmark-link-icon" xlink:href="#icon-bookmark"></use></svg></span>`
      );
    } else {
      el.insertAdjacentHTML(
        'beforeend',
        `<span class="bookmark-link favorited" style="color:#81c14b"><svg class="icon eksico bookmark-link-icon-svg" ><use class="bookmark-link-icon" xlink:href="#icon-bookmark"></use></svg></span>`
      );
    }
  })
}

const injectHTML = () => {
  const el_svg = document.body.querySelector('svg > symbol');
  const el_top_nav = document.body.querySelector('nav#top-navigation > ul')

  // add svgs as symbols
  el_svg.insertAdjacentHTML(
    'beforebegin',
    `<symbol id="icon-bookmark"  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="afeather afeather-bookmark" viewBox="0 0 24 24">
      <title>bookmark</title>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </symbol>
    <symbol id="icon-bin" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="afeather afeather-trash-2" viewBox="0 0 24 24" >
      <title>bin</title>
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/>
    </symbol>`
  );
  
  // add navigation button
  el_top_nav.insertAdjacentHTML(
    'afterbegin',
    `<li class="bookmarks">
      <span id="bookmarks-modal-btn" title="yer-isaretleri">
        <svg class="eksico bookmarks-modal-icon">
          <use xlink:href="#icon-bookmark"></use>
        </svg>
        yer isaretleri
      </span>
    </li>`
  );

  // add modal
  document.body.insertAdjacentHTML(
    'afterbegin',
    `<div id="bookmarks-modal-root" class="bookmark-modal">
      <div class="bm-modal-content">
        <div class="bm-modal-header">
        <h1>Yer Isaretlerim</h1>
        <div class="bookmarks-modal-close">×</div>
        </div>
        <ul class="bookmark-ul"></ul>
      </div>
    </div>`
  );

  //renderList()
  addButtonsToEntries()
}

const bookmarkListItemFunctions = () => {
  const b_items_title = document.querySelectorAll(".bm-title")
  const b_items_remove = document.querySelectorAll(".bookmark-sil")

  b_items_title.forEach(b => {
    b.addEventListener("click", (e) => {
      console.log("title click")
      const entry_id = b.parentNode.getAttribute("entry_id")
      window.location.href = entry_url + entry_id
    })
  })

  b_items_remove.forEach(b => {
    b.addEventListener("click", () => {
      const entry_id = b.parentNode.getAttribute("entry_id")
      removeBookmark(entry_id)
      renderList()
      bookmarkListItemFunctions()
    })
  })
}

const modalFunctions = () => {
  const modal = document.querySelector("#bookmarks-modal-root")
  const modal_content = document.querySelector("#bookmarks-modal-root .bm-modal-content")
  const body = document.querySelector('body')
  const modal_btn = document.querySelector("#bookmarks-modal-btn")
  const modal_close_span = document.querySelector(".bookmarks-modal-close")

  modal_btn.addEventListener("click", () => {
    renderList()
    bookmarkListItemFunctions()
    body.classList.add("modal-visible")
    modal.classList.add("modal-visible")
  })

  modal_close_span.addEventListener("click", () => {
    modal.classList.remove("modal-visible")
    body.classList.remove("modal-visible")
  })

  modal_content.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
  })

  modal.addEventListener("click", (e) => {
    modal.classList.remove("modal-visible")
    body.classList.remove("modal-visible")
  })
}

const bookmarkFunctions = () => {
  const b_links = document.querySelectorAll(".bookmark-link")

  b_links.forEach(bl => {
    bl.addEventListener("click", () => {
      const entry_node = bl.parentNode.parentNode.parentNode
      const entry_id = entry_node.getAttribute("data-id")
      const author = entry_node.getAttribute("data-author")
      const title = document.title.split(' - ')[0]
      const new_b = new bookmark(title,entry_id,author)
      if(bl.classList.contains("favorited")) {
        bl.classList.remove("favorited")
      } else {
        bl.classList.add("favorited")
      }
      toggleBookmark(new_b)
    })
  })

}

loadFromLocalStorage()
injectHTML()
modalFunctions()
bookmarkFunctions()