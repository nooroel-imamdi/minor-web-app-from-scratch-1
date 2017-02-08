"strict mode";

(function() {
  var app = {
    init: function() {
      routes.init();
    }
  }

  var routes = {
    init: function() {
      window.onhashchange = function() {
        sections.toggle();
      };
    }
  }

  var sections = {
    toggle: function(route) {
      var sectionsList = document.querySelectorAll("section");

      sectionsList.forEach(function(section) {
        if(location.hash === "#" + section.id) {
          section.classList.add("active");
          document.querySelector("a[href='#" + section.id + "']").classList.add("active");
        } else {
          section.classList.remove("active");
          document.querySelector("a[href='#" + section.id + "']").classList.remove("active");
        }
      });
    }
  }

  app.init();

  
})();