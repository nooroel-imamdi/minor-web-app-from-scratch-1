{
  const app = {
    init() {
      // Menu functions
      menu.toggle();
      menu.focus.icon();
      menu.focus.lastChild();
    }

  }

  const menu = {
    // Variables
    list: document.getElementsByTagName('nav')[0].querySelectorAll('ul')[0],
    items: document.getElementsByTagName('nav')[0].querySelectorAll('ul')[0].querySelectorAll('li'),
    input: document.getElementsByTagName('nav')[0].querySelectorAll('input')[0],
    icon: document.getElementsByTagName('nav')[0].querySelectorAll('img')[0],

    // Focus functions
    focus: {
      // Open menu on icon focus using hidden input element
      icon() {
        menu.input.addEventListener('focus', function(e) {
          if(menu.list.classList.contains('hide')) {
            menu.show();
          } else {
            menu.hide();
          }
        });
      },

      // Hide menu after blur on last item in menu
      lastChild() {
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