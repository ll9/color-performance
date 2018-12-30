class SpectrumSingleton {
    constructor() {
        /** @type {HTMLElement} */
        this.currentElement = null;
        this.tooltip = document.getElementById("color-popover-container");
        this.initialize();
    }

    initialize() {
        $("#color-popover").spectrum({
            color: "#f00",
            flat: true,
            showPalette: true,
            move: (color) => {
                this.currentElement.getElementsByClassName('sp-preview-inner')[0].style.backgroundColor = color.toHexString();
                // document.dispatchEvent(new Event('click'));
            },
            palette: [
                ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
                ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
                [
                    "#f4cccc",
                    "#fce5cd",
                    "#fff2cc",
                    "#d9ead3",
                    "#d0e0e3",
                    "#cfe2f3",
                    "#d9d2e9",
                    "#ead1dc"
                ],
                [
                    "#ea9999",
                    "#f9cb9c",
                    "#ffe599",
                    "#b6d7a8",
                    "#a2c4c9",
                    "#9fc5e8",
                    "#b4a7d6",
                    "#d5a6bd"
                ],
                [
                    "#e06666",
                    "#f6b26b",
                    "#ffd966",
                    "#93c47d",
                    "#76a5af",
                    "#6fa8dc",
                    "#8e7cc3",
                    "#c27ba0"
                ],
                [
                    "#c00",
                    "#e69138",
                    "#f1c232",
                    "#6aa84f",
                    "#45818e",
                    "#3d85c6",
                    "#674ea7",
                    "#a64d79"
                ],
                [
                    "#900",
                    "#b45f06",
                    "#bf9000",
                    "#38761d",
                    "#134f5c",
                    "#0b5394",
                    "#351c75",
                    "#741b47"
                ],
                [
                    "#600",
                    "#783f04",
                    "#7f6000",
                    "#274e13",
                    "#0c343d",
                    "#073763",
                    "#20124d",
                    "#4c1130"
                ]
            ]
        });
    }

    htmlToElement(html) {
        var template = document.createElement("template");
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
    }

    addItems(amount) {
        const parent = document.getElementById("container");
        console.time("startup");
        for (let index = 0; index < amount; index++) {
            let rawHtml = `
          <div class="sp-replacer sp-light" id="${`color-picker-${index}`}" onclick=spectrumSingleton.toggleColorPicker(this)>
              <div class="sp-preview">
                  <div class="sp-preview-inner" style="background-color: rgb(255, 0, 0);"></div>
              </div>
              <div class="sp-dd">▼</div>
          </div>
          `;
            parent.appendChild(this.htmlToElement(rawHtml));
        }
        console.timeEnd("startup");
    }

    /**
     * 
     * @param {HTMLElement} element 
     */
    toggleColorPicker(element) {
        this.currentElement = element;
        const tooltipRect = this.tooltip.getBoundingClientRect();
        const rect = element.getBoundingClientRect();
        const tooltipIsVisible = tooltipRect.top == rect.bottom &&
            tooltipRect.left == rect.left &&
            this.tooltip.style.display == "block";

        setTimeout(() => {
            if (!tooltipIsVisible) {
                $("#color-popover").spectrum("set", element.getElementsByClassName('sp-preview-inner')[0].style.backgroundColor);
                this.tooltip.style.display = 'block';
                this.tooltip.style.top = rect.bottom;
                this.tooltip.style.left = rect.left;
                hideOnClickOutside(this.tooltip);
            }
        }, 0);
    }
}