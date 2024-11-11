let buttons = document.querySelectorAll(".btn");
let textEditor = document.querySelector(".create-text-editor");
let option = document.querySelectorAll(".option");
let fontName = document.getElementById("font-Name");
let fontSize = document.querySelector("[data-element='fontSize']");
let foreColor = document.getElementById("foreColor");
let backColor = document.getElementById("backColor");
let formatBlock = document.querySelector("[data-element='formatBlock']");


buttons.forEach(function (button) {
    // console.log(button);
    button.addEventListener("click", function () {
        let command = button.dataset["element"];
        console.log(command);
        if (command == "paste") {
            navigator.clipboard.readText().then(text => {
                document.execCommand('insertText', false, text);
            }).catch(err => {
                console.log('Failed to read clipboard contents: ', err);
            });
        }
        else if (command === "insertImage") {
            let url = prompt("Enter image URL here:", "https://");
            document.execCommand(command, true, url);
        }
        else if (command === "createLink") {
            let url1 = prompt("Enter link here:", "https://");

            document.execCommand(command, true, url1)

            textEditor.addEventListener("mouseenter", function () {
                let a = textEditor.querySelectorAll('a')

                a.forEach(item => {
                    item.addEventListener("mouseenter", function () {
                        textEditor.setAttribute("contenteditable", false)
                        item.target = "_blank";
                    });
                    item.addEventListener("mouseleave", function () {
                        textEditor.setAttribute("contenteditable", true)

                    });
                });
            });
        }
        else {
            document.execCommand(command, false, null)
        }
    });
});

fontName.addEventListener("change", function () {
    let fontNameValue = fontName.value;
    document.execCommand('styleWithCSS', true);
    textEditor.style.fontFamily = fontNameValue;
});

fontSize.addEventListener("change", function () {
    let fontSizeValue = fontSize.value;
    document.execCommand('fontSize', false, fontSizeValue);
    document.execCommand('styleWithCSS', true, null);
    switch (fontSizeValue) {
        case "1":
            textEditor.style.fontSize = "15px";
            break;
        case "2":
            textEditor.style.fontSize = "20px";
            break;
        case "3":
            textEditor.style.fontSize = "25px";
            break;
        case "4":
            textEditor.style.fontSize = "30px";
            break;
        case "5":
            textEditor.style.fontSize = "35px";
            break;
        default:
            textEditor.style.fontSize = "initial";
    }
});


foreColor.addEventListener("input", function () {
    let colorValue = foreColor.value;
    document.execCommand('foreColor', false, colorValue);
});


backColor.addEventListener("input", function () {
    let bgColorValue = backColor.value;
    document.execCommand('backColor', false, bgColorValue);
});


formatBlock.addEventListener("change", function () {
    let formatValue = formatBlock.value;
    document.execCommand('formatBlock', false, formatValue);
});
