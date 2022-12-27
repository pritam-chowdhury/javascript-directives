(function () {
    const inputElems = document.querySelectorAll("[pc-model]");
    const boundElems = document.querySelectorAll("[pc-bind]");
    const btn = document.querySelector(".btn");
    let scope = {};
    console.log(inputElems);
    btn.addEventListener("click", function () {
        btnclick();
    })
    inputElems.forEach((elem) => {
        let propName = elem.getAttribute("pc-model");
        if (elem.type === "text" || elem.type === "textarea") {
            elem.addEventListener("keyup", function () {
                scope[propName] = elem.value;
            });
        }
        if (elem.type.includes("select")) {
            elem.addEventListener("change", function () {
                scope[propName] = elem.value;
            });
        }
        if (elem.type === "radio") {
            elem.addEventListener("change", function () {
                scope[propName] = elem.value;
            });
        }

        updatePropbinding(propName)
    });
    function updatePropbinding(propName) {
        let value;
        if (!scope.hasOwnProperty(propName)) {
            Object.defineProperty(scope, propName, {
                set: function (newVal) {
                    value = newVal;
                    inputElems.forEach((elm) => {
                        if (elm.getAttribute("pc-model") === propName) {
                            if (elm.type !== "radio") {
                                elm.value = value;
                            }
                            if (elm.type === "radio") {
                                const nodeList = document.querySelectorAll(`[pc-model=${propName}]`);
                                const index = [...nodeList].findIndex((item) => item.value === scope[propName]);
                                document.querySelectorAll(`[pc-model=${propName}]`)[index].checked = true;
                            }
                        }
                    });
                    boundElems.forEach((elem) => {
                        if (elem.getAttribute("pc-bind") === propName && !elem.type) {
                            elem.innerHTML = value;
                        }
                    });
                },
                get: function () {
                    return value
                },
                enumerable: true
            });
        }
    }

    function btnclick() {
        console.log(scope);
    }
    scope.language = "CSS";
    scope.carname = "saab";
    scope.coursePlatform = "UDEMY"
})();