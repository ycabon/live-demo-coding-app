define([
  "require"
], function(require) {

  return function(config) {
    document.title = config.title;
    document.querySelector(".top-nav-title").innerHTML = config.title;
    if (document.querySelector(".top-nav-link")) {
      document.querySelector(".top-nav-link").innerHTML = config.title;
    }

    config.setup();

    const steps = config.steps;

    if (!steps) {
      const accordion = document.querySelector("#codeSnippets");
      if (accordion) {
        accordion.parentNode.removeChild(accordion);
      }
      return;
    }


    require(["./ts/editor"], function(editor) {

      function on(id, event, handler) {
        var element = document.getElementById(id) || id;
        if (!element || !element.addEventListener) {
          throw new TypeError("on:element undefined");
        }
        element.addEventListener(event, handler);
        return {
          remove: () => { element.removeEventListener(event, handler); }
        }
      }

      function createSection(title, isRunnable) {
        const div = document.createElement("div");

        div.innerHTML = 
          `<div class="accordion-section">
            <h4 class="accordion-title">
              <span class="accordion-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 32 32" class="svg-icon"><path d="M28 9v5L16 26 4 14V9l12 12L28 9z"/></svg>
              </span>
              ${title}
            </h4>
            <div class="accordion-content">
              <div class="editor"></div>
              <div class="run-button"><button class="btn">Run</button></div>
            </div>
          </div>`;

        if (!isRunnable) {
          const runButton = div.querySelector(".run-button");
          runButton.parentNode.removeChild(runButton);
        }

        return div.firstChild;
      }

      const sections = steps.map(step => {
        const { title, run } = step;
        const section = createSection(title, run != null);
        document.querySelector(".js-accordion").appendChild(section);
        
        return section;
      });

      calcite.addClass(sections[0], "is-active");
      calcite.init();

      steps.forEach((step, i) => {
        const editorDiv = sections[i].querySelector(".editor");
        const monaco = editor(editorDiv, step.code.trim(), {
          language: "javascript",
          lineNumbers: false,
          automaticLayout: true,
          renderLineHighlight: false,
          selectionHighlight: false,
          scrollbar: {
            horizontal: "hidden",
            verticalScrollbarSize: 9
          },
          fontFamily: `Fira Code, Consolas, "Courier New", monospace`,
          fontSize: 14,
          fontLigatures: true,
          theme: "vs-black"
        });
        console.log(monaco.fontFamily);

        const lineHeight = monaco.getConfiguration().lineHeight;
        const lineCount = monaco.getModel().getLineCount();
        const contentHeight = Math.min(lineHeight * lineCount, 350);

        editorDiv.style.height = contentHeight + "px";
        
        const runButton = sections[i].querySelector(".run-button");
        if (runButton) {
          on(sections[i].querySelector(".run-button"), "click", e => step.run());
        }
      });

      calcite.bus.on("accordion:toggle", function(evt) {
        var sections = document.getElementsByClassName("accordion-section");
        let isActive, wasActive;

        for (var i = 0; i < sections.length; i++) {
          var node = sections[i];
          if (node === evt.node) {
            calcite.addClass(node, "is-active");
            isActive = i;
          }
          else if (calcite.hasClass(node, "is-active")) {
            calcite.removeClass(node, "is-active");
            wasActive = i;
          }
        }

        if (steps[wasActive].after) {
          steps[wasActive].after();
        }

        if (steps[isActive].before) {
          steps[isActive].before();
        }
      });
    });
  }
});