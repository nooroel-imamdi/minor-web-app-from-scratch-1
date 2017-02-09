"strict mode";

{ 
  const app = {
    init: () => {
      routes.init();
    }
  }

  const routes = {
    init: () => {
      window.location.hash ? sections.toggle(window.location.hash) : sections.toggle('#start');

      window.onhashchange = () => {
        sections.toggle(window.location.hash);
      };
    }
  }

  const sections = {
    toggle: route => {
      const sectionsList = document.querySelectorAll("section");

      sectionsList.forEach(section => {
        if(route === "#" + section.id) {
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
}
