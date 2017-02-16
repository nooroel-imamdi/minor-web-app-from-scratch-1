{
  const xhttp = new XMLHttpRequest();

  const getApi = function(cb){

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

  getApi(function(data){
    data.items.map(function(el) {
    });
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
