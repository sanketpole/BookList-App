//Book class
    class Book{
        constructor(title, author, isbn){
            this.title = title;
            this.author = author;
            this.isbn = isbn;
        }
    }

//UI class

class UI{
    static displayBooks(){
       

        const Books  = Store.getBooks();

        Books.forEach((Book) => UI.addBookToList(Book));
    }

    static addBookToList(Book){

        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${Book.title}</td>
        <td>${Book.author}</td>
        <td>${Book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`
    
        list.appendChild(row)
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form')
        container.insertBefore(div, form)

        //vanish in 3 sec
        setTimeout(() => document.querySelector('.alert').remove(),2000)
    }

    static clearFields(){
        document.querySelector('#title').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#isbn').value = ''
    }

}

//store class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = []
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books
    }
    static addBook(book){
        const books = Store.getBooks()

        books.push(book)

        localStorage.setItem('book', JSON.stringify(books))
    }
    static removeBook(isbn){
        const books = Store.getBooks()

        books.forEach((book, index) =>{
            if(book.isbn){
                books.splice(index, 1)
            }
        })

        localStorage.setItem('books', JSON.stringify(books))
    }
}

//Event: display book

document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: add a book

document.querySelector('#book-form').addEventListener('submit', (e) =>{

    //get form values
    e.preventDefault()
    
    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const isbn = document.querySelector('#isbn').value


    //validate
    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('Please fill in all fields', 'danger')
    }else{
        const book = new Book(title, author, isbn)

        //Add book to UI
        UI.addBookToList(book)

        //add book to store
        Store.addBook(book)

        //show success msg
        UI.showAlert('Book Added', 'success')
    
        //clear fields
        UI.clearFields()
    }

  
})

//Event: remove a book
document.querySelector('#book-list').addEventListener('click', (e)=>{
    
    //remove book from UI
    UI.deleteBook(e.target)

    //remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibiling.textContent)

    //show success msg
    UI.showAlert('Book removed' , 'success')
})

