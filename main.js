const RENDER_EVENT= "render_books"
const STORAGE_KEY= "booksData"
const booksData= []
let searchKeyWord= ""

const searchKeywordsSpan= document.querySelector("#searchKeywords")

document.addEventListener("DOMContentLoaded", ()=> {
  const searchBookForm= document.querySelector("#searchBookForm")

   document.getElementById("addBookForm").addEventListener("submit", (event)=> {
    event.preventDefault()

    const titleInput= document.querySelector("#addBookTitle")
    const authorInput= document.querySelector("#addBookAuthor")
    const bookYear= document.querySelector("#addBookYear")

    booksData.push({
      id: +new Date(),
      title: titleInput.value,
      author: authorInput.value,
      year: bookYear.value,
      isComplete: false
    })

    titleInput.value= ""
    authorInput.value= ""
    bookYear.value= ""

    alert("buku berhasil ditambahkan.")

    localStorage.setItem(STORAGE_KEY, JSON.stringify(booksData))
    document.dispatchEvent(new Event(RENDER_EVENT))
  })

  document.querySelector("#searchBookTitle").addEventListener("input", e=> {
    e.preventDefault()

    const keyword= document.querySelector("#searchBookTitle").value
    searchKeyWord= keyword

    searchKeywordsSpan.innerHTML= keyword?`Anda mencari : ${keyword}`:""

    document.dispatchEvent(new Event(RENDER_EVENT))
  })

  searchBookForm.addEventListener("reset", e=> {
    searchKeyWord= ""
    searchKeywordsSpan.innerHTML= ""

    document.dispatchEvent(new Event(RENDER_EVENT))
  })

  loadDataFromLocalStorage()
})

function loadDataFromLocalStorage() {
  if (!typeof (Storage)) {
    return;
  }

  const localBooks= localStorage.getItem(STORAGE_KEY)

  if (localBooks) {
    booksData.push(...JSON.parse(localBooks))

    document.dispatchEvent(new Event(RENDER_EVENT))
  }
}

function updateBook(bookId) {
  const bookIndex= booksData.findIndex(v=> v.id==bookId)

  if (bookIndex == -1) {
    return
  }

  const bookData= booksData[bookIndex]
  
  let title= null
  let author= null
  let year= null

  while (!title || !title.length) {
    title= prompt("Judul buku", bookData.title)
  }

  while (!author || !author.length) {
    author= prompt("Author buku", bookData.author)
  }

  while (!parseInt(year)) {
    year= prompt("Tahun buku terbit", bookData.year)
  }

  booksData[bookIndex].title= title
  booksData[bookIndex].author= author
  booksData[bookIndex].year= parseInt(year)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(booksData))
  document.dispatchEvent(new Event(RENDER_EVENT))
}

function updateBookStatus(bookId) {
  const findBook= booksData.find(v=> v.id==bookId)

  if (!findBook) {
    return
  }

  findBook.isComplete= !findBook.isComplete

  localStorage.setItem(STORAGE_KEY, JSON.stringify(booksData))
  document.dispatchEvent(new Event(RENDER_EVENT))
}

function deleteBook(bookId) {
  if (!confirm("Hapus buku ?")) {
    return
  }

  const bookIndex= booksData.findIndex(book=> book.id==bookId)

  if (bookIndex == -1) {
    return
  }

  booksData.splice(bookIndex, 1)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(booksData))
  document.dispatchEvent(new Event(RENDER_EVENT))
}

document.addEventListener(RENDER_EVENT, ()=> {
  const books= !searchKeyWord?booksData:booksData.filter((book)=> book.title.includes(searchKeyWord))

  const uncompletedBookListContainer= document.querySelector("#incompleteBookshelfList")
  uncompletedBookListContainer.innerHTML= ""
  
  const completedBookListContainer= document.querySelector("#completeBookshelfList")
  completedBookListContainer.innerHTML= ""
  
  books.forEach(book=> {
    const bookListContainer= book.isComplete?completedBookListContainer:uncompletedBookListContainer

    const articleContainer= document.createElement("article")
    articleContainer.classList.add("item")

    const bookTitle= document.createElement("h3")
    bookTitle.innerHTML= book.title

    const bookAuthor= document.createElement("p")
    bookAuthor.innerHTML= `Author : ${book.author}`

    const bookYear= document.createElement("p")
    bookYear.innerHTML= `Tahun Terbit : ${book.year}`

    const actionContainer= document.createElement("div")
    actionContainer.classList.add("action")

    const updateBookStatusBtn= document.createElement("button")
    updateBookStatusBtn.classList.add("updateBtn")
    updateBookStatusBtn.innerHTML= `${book.isComplete?"Belum":""} Selesai dibaca`

    updateBookStatusBtn.addEventListener("click", ()=> {
      updateBookStatus(book.id)
    })

    const deleteBookBtn= document.createElement("button")
    deleteBookBtn.classList.add("deleteBtn")
    deleteBookBtn.innerHTML= "Hapus"

    deleteBookBtn.addEventListener("click", ()=> {
      deleteBook(book.id)
    })

    if (!book.isComplete) {
      const updateBookBtn= document.createElement("button")
      updateBookBtn.classList.add("editBtn")
      updateBookBtn.innerHTML= "Edit Buku"

      updateBookBtn.addEventListener("click", ()=> {
        updateBook(book.id)
      })

      actionContainer.append(updateBookStatusBtn, updateBookBtn, deleteBookBtn)
    } else {
      actionContainer.append(updateBookStatusBtn, deleteBookBtn)
    }

    articleContainer.append(bookTitle, bookAuthor, bookYear, actionContainer)

    bookListContainer.append(articleContainer)
  })
})