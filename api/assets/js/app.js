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
        // Routes
        routes.create();

        // Sections
        sections.template();

        // Menu
        menu.toggle();
        menu.onFocus.showMenu();
        menu.onFocus.blurLastItem();
      }

    }

    const routes = {
      // Create routes
      checkHash() {
        window.location.hash ? sections.toggle(window.location.hash) : sections.toggle('#start');

        window.onhashchange = () => {
          sections.toggle(window.location.hash);
        };
      },

      create() {
        routie({
          'start': function() {
            routes.checkHash();
          },
          'books': function() {
            routes.checkHash();
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

      template() {

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

    // Initialize the app
    app.init();
  });
}