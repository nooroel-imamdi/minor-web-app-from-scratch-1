{
  const app = {
    init() {
      // Routes
      routes.create();

      // Menu functions
      menu.toggle();
      menu.onFocus.showMenu();
      menu.onFocus.blurLastItem();
    }

  }

  const routes = {
    // Create routes
    create() {
      routie({
        'start': function() {
          window.location.hash ? sections.toggle(window.location.hash) : sections.toggle('#start');

          window.onhashchange = () => {
            sections.toggle(window.location.hash);
          };
        },
        'books': function() {
          window.location.hash ? sections.toggle(window.location.hash) : sections.toggle('#start');

          window.onhashchange = () => {
            sections.toggle(window.location.hash);
          };
        },
      });
    }
  }

  const sections = {
    toggle: route => {
      console.log('test');

      const sectionsList = document.querySelectorAll("section");

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
}