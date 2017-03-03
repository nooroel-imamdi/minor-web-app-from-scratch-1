{
  const api = {
    // Variables
    xhttp: new XMLHttpRequest(),
    KEY: 'AIzaSyDW8hCnM4qyar5qsg7_65w4DVGGls411dw',
    URL: 'https://www.googleapis.com/books/v1/volumes?q=+:keyes&key',

    // Setup
    setup: cb => {
      api.xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // Parse the data to an object
          let data = JSON.parse(this.responseText);
          cb(data);
        }
      };

      api.xhttp.open("GET", api.URL + api.KEY, true);
      api.xhttp.send();
    }
  }

  // Make API data available
  api.setup(function(data) {
    const app = {
      init() {
        // Menu
        menu.toggle();
        menu.onFocus.showMenu();
        menu.onFocus.blurLastItem();

        // Routes
        routes.create();

        // Sections
        sections.template.listView();
        sections.template.books();
      }

    }

    const menu = {
      // Variables
      list: document.getElementsByTagName('nav')[0].querySelectorAll('ul')[0],
      items: document.getElementsByTagName('nav')[0].querySelectorAll('ul')[0].querySelectorAll('li'),
      input: document.getElementsByTagName('nav')[0].querySelectorAll('input')[0],
      icon: document.getElementsByTagName('nav')[0].querySelectorAll('img')[0],

      // Focus functions
      onFocus: {
        // Open menu on icon focus using hidden input element
        showMenu() {
          menu.input.addEventListener('focus', function(e) {
            if(menu.list.classList.contains('hide')) {
              menu.show();
            } else {
              menu.hide();
            }
          });
        },

        // Hide menu after blur on last item in menu
        blurLastItem() {
          const lastChild = menu.items[menu.items.length - 1];

          lastChild.querySelectorAll('a')[0].addEventListener('blur', function(e) {
            menu.hide();
          });
        }
      },

      show() {
        // Remove the 'hide' class and add the 'show' class
        menu.list.classList.remove('hide');
        menu.list.classList.add('show');
      },

      hide() {
        // If the menu contains the 'show' class, remove it and add the 'hide' class
        menu.list.classList.remove('show');
        menu.list.classList.add('hide');
      },

      toggle() {
        // Trigger function when icon is clicked
        this.icon.onclick = function() {
          // Check if the menu contains the 'hide' class
          if(menu.list.classList.contains('hide')) {
            menu.show();
          } else {
            menu.hide();
          }
        }
      }
    }

    const routes = {
      // Create routes
      change() {
        window.location.hash ? sections.toggle(window.location.hash) : sections.toggle('#start');

        window.onhashchange = () => {
          sections.toggle(window.location.hash);
        };
      },

      create() {
        routie({
          'start': function() {
            routes.change();
          },
          'books': function() {
            routes.change();
          },
        });
      }
    }

    const sections = {
      toggle: route => {
        const sectionsList = document.querySelectorAll("section");

        // Change 'active' section equal to hash
        sectionsList.forEach(section => {
          if(route === `#${section.id}`) {
            section.classList.add("active");
            document.querySelector(`a[href='#${section.id}']`).classList.add("active");
          } else {
            section.classList.remove("active");
            document.querySelector(`a[href='#${section.id}']`).classList.remove("active");
          }
        });
      },

      template: { 
        listView() {
          // Get all the required data
          books.title();
          books.author();
          books.description();
          books.image();

          // Put the data in a new object
          collection = [
            {
              title: title,
              author: author,
              description: description,
              image: image
            }
          ];

          console.log(collection);

          collection[0].author.forEach(function(book, i) {

          // Get list and create new element for each book
          var template = document.getElementById("books-overview").innerHTML,
          el = document.createElement('div');

          el.innerHTML = template;

          // Put the data in the specified classes
          el.getElementsByClassName("book-title")[0].innerHTML += `${title[i]}<br />`;
          el.getElementsByClassName("book-image")[0].innerHTML += `<img src="${image[i]}" /><br />`;
          el.getElementsByClassName("book-authors")[0].innerHTML += `<strong>Authors:</strong>${author[i]}<br />`;
          // el.getElementsByClassName("book-description")[0].innerHTML += `${description[i]}`;

          // Append each child to its parent
          document.getElementById("list").appendChild(el);
          });
        },

        books() {
          console.log('books');
        }
      }
    }

    const books = {
      // Map the data into seperate data to reduce load
      title() {
        title = data.items.map(function(book) {
        return book.volumeInfo.title;
        }); 
      },

      author() {
        author = data.items.map(function(book) {
          return book.volumeInfo.authors;
        });
      },

      description() {
        description = data.items.map(function(book) {
          return book.volumeInfo.description;
        });
      },

      image() {
        image = data.items.map(function(book) {
          return book.volumeInfo.imageLinks.smallThumbnail;
        });
      }
    }
    // Initialize the app
    app.init();
  });
}
