// {
  // const xhttp = new XMLHttpRequest();

  // const getApi = function(cb){  
    
//   }

//   getApi(function(data){
//     const books = data;
//     console.log(books);
//   });
// }

{
  const xhttp = new XMLHttpRequest();

  const api = function(cb) {   
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         // Typical action to be performed when the document is ready:
         var data = JSON.parse(this.responseText);
         cb(data);
      }
    };

    xhttp.open("GET", "https://www.googleapis.com/books/v1/volumes?q=+:keyes&key=AIzaSyDW8hCnM4qyar5qsg7_65w4DVGGls411dw", true);
    xhttp.send();
  }

  api(function(data) {
    const app = {
      init() {
        this.template();
        this.getBooks();
        this.routes();
      },

      routes() {
        // Routing here
      },

      getBooks() {
        books = data.items.map(function(book) {
          return book;
        });
      },

      getTitle() {
        this.getBooks();

        title = books.map(function(book) {
          return book.volumeInfo.title;
        });        
      },

      getAuthors() {
        this.getBooks();

        authors = books.map(function(book) {
          return book.volumeInfo.authors;
        });
      },

      getDescription() {
        this.getBooks();

        description = books.map(function(book) {
          return book.volumeInfo.description;
        });
      },

      template() {
        this.getTitle();
        this.getAuthors();
        this.getDescription();

        books = [
          {
            authors: authors,
            description: description
          }
        ];

        books[0].authors.forEach(function(book, i) {

        var template = document.getElementById("books-overview").innerHTML,
        el = document.createElement('div');

        el.innerHTML = template;

        el.getElementsByClassName("book-title")[0].innerHTML += `${title[i]}<br />`;
        el.getElementsByClassName("book-authors")[0].innerHTML += `<strong>Authors:</strong>${authors[i]}<br />`;
        el.getElementsByClassName("book-description")[0].innerHTML += `${description[i]}`;

        document.getElementById("list").appendChild(el);
        });
      }
    }

    app.init();
  });
}

// Useful 
// authors data.items.volumeInfo.authors < array
// description data.items.volumeInfo.description < string
// title data.items.volumeInfo.title < string
// average rating data.items.volumeInfo.averageRating < int
// rating count data.items.volumeInfo.ratingsCount < int
// page count data.items.volumeInfo.pageCount < int
// small thumbnail data.items.volumeInfo.imageLinks.smallThumbnail < string
// thumbnail data.items.volumeInfo.imageLinks.thumbnail < string
// categories data.items.volumInfo.categories < array
// buy link data.items.saleInfo.buyLink < string
// price data.items.saleInfo.listPrice.amount < int
// currency data.items.saleInfo.listPrice.currencyCode < string
