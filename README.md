# Minor - Web app from scratch

## Assignments live preview
* Single page web app: https://larsdouweschuitema.github.io/minor-web-app-from-scratch/single-page-web-app/index.html

## ES6
ES5:
```javascript

// IIFE
function(){
    // Variables
    var person = {
        name: 'Lars'
    },
    
    // Functions
    speakLoud: function() {
        // Template literals
        console.log('Hello' + person.name);
    }
}();
```
ES6:
```javascript
// Block global scope
{
    // Variables
    const person = { // 'const' is not updateable
        name: 'Lars'
    },

    let dog = { // 'let' is updateable
        name: 'Lassie'
    },
    
    // Functions
    speakLoud: () => {
        // Template literals
        console.log(`Hello ${person.name}`);
    },
}
```

## Pros and Cons jQuery
**Pros**
* Ease of use because of simple syntax and less code to achieve equal results
* Ajax support
* Large open source community resulting in good documentation and a lot of prewritten plugins
* Good compatibility supporting most things even in IE6
* Light weight compared to other frameworks

**Cons**
* Functionality may be limited
* jQuery javascript file required
* DOM manipulation in large complex sites leads to slow website. In case of animation it is a lot slower than using CSS

**Sources**
* http://www.jscripters.com/jquery-disadvantages-and-advantages/
* http://stackoverflow.com/questions/1841603/jquery-ui-pros-and-cons
* http://www.webdesignerdepot.com/2012/09/jquery-the-good-the-bad-and-the-ugly/

## Pros and Cons single page web app
**Pros**
* There is a clear beginning, middle and end because of the lineair workflow
* One-page navigation is more straightforward for projects with a single purpose
* Scrolling is easier and more continuous than clicking endless links
* No page refresh

**Cons**
* Less feasible for the user as content increases
* Slow loading when content increases
* Decreased ranks in search engines because there is just one page

**Disagreement in articles**
* Quality over quantity is not the case because you can still make endless of sections

**Sources**
* https://www.uxpin.com/studio/blog/single-page-vs-multi-page-ui-design-pros-cons/
* https://www.apicasystem.com/blog/speed-up-the-pros-and-cons-of-single-page-sites/
* http://wesbos.com/es6-block-scope-iife/
