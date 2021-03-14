//Старый IBG
oldIbg();
function oldIbg() {
    let element = document.querySelectorAll("._oldibg");
    if (element.length) {
        for (let index = 0; index < element.length; index++) {
            const wrapper = element[index];
            let img = wrapper.querySelector("img");
            let src = img.getAttribute("src");
            wrapper.style.backgroundImage = `url("${src}")`;
        }
    }
}

//Админка
showAccount();
function showAccount() {
    buttonArr = document.querySelectorAll(".account-header__button");
    if (buttonArr.length) {
        buttonArr.forEach((button) => {
            let body = document.querySelector(".account-header__body");

            button.addEventListener("click", () => {
                body.classList.toggle("_active");
                _slideToggle(body);
            });

            document.addEventListener("mouseup", (e) => {
                if (body.classList.contains("_active")) {
                    let childrens = button.closest(".account-header")
                        .childNodes;
                    childrens.forEach((children) => {
                        if (e.target !== children && e.target !== button) {
                            _slideUp(body);
                            body.classList.remove("_active");
                        }
                    });
                }
            });
        });
    }
}

showCatalog();
function showCatalog() {
    body = document.querySelector(".menu__li-catalog ul");
    button = document.querySelector(".menu__li-catalog .menu__link");
    button.addEventListener("click", (e) => {
        e.preventDefault();
    });

    document.addEventListener("mouseover", (e) => {
        if (e.target.closest(".menu__li-catalog")) {
            body.classList.add("_active");
        }
    });
    document.addEventListener("mouseout", (e) => {
        if (e.target.closest(".menu__li-catalog")) {
            //_slideUp(body);
            body.classList.remove("_active");
        }
    });
}

//Ленивая загрузка
blazy();
function blazy() {
    let lazyLoad = new Blazy({
        loadInvisible: true,
        container: ".products__specials",
    });
    const lazyImage =
        "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
}

//? FILTERS SHOW
function filtersShow() {
    let buttonFintersOpen = document.querySelector(".fixed__filters");
    let buttonFintersClose = document.querySelector(
        ".filters-catalogies__close"
    );

    if (buttonFintersOpen && buttonFintersClose) {
        buttonFintersOpen.addEventListener("click", () => {
            document
                .querySelector(".bf-panel-wrapper")
                .classList.add("_active");
            document.querySelector("body").classList.add("_lock");
        });
        buttonFintersClose.addEventListener("click", () => {
            document
                .querySelector(".bf-panel-wrapper")
                .classList.remove("_active");
            document.querySelector("body").classList.remove("_lock");
        });
    }
}

//* Велосипед
bicycleRoad();
function bicycleRoad() {
    let md2 = window.matchMedia("(max-width:991.98px)");
    function gsapRun() {
        if (!md2.matches) {
            gsapInit();
        } else {
            gsap.killTweensOf(".footer__bicycle");
            let item = document
                .querySelector(".footer__bicycle")
                .removeAttribute("style");
        }
    }
    gsapRun();
    md2.addListener(gsapRun);

    //================
    function gsapInit() {
        gsap.timeline({
            repeat: -1,
            defaults: {
                duration: 1.7,
                ease: "none",
            },
        })
            .to(".footer__bicycle", {
                x: -300,
                duration: 0,
            })
            .to(".footer__bicycle", {
                x: 0,
                opacity: 1,
            })
            .to(".footer__bicycle", {
                rotate: -25,
                x: 30,
                y: -10,
                rotate: -35,
                duration: 0.3,
            })
            .to(".footer__bicycle", {
                x: 340,
                y: -165,
                duration: 3.5,
            })
            .to(".footer__bicycle", {
                x: 450,
                y: -125,
                rotate: -45,
                duration: 1,
            })
            .to(".footer__bicycle", {
                x: 550,
                y: -175,
                rotate: -60,
                duration: 1.5,
            })
            .to(".footer__bicycle", {
                x: 660,
                y: -330,
                rotate: -70,
                duration: 1.3,
            })
            .to(".footer__bicycle", {
                x: 740,
                y: -330,
                rotate: 0,
                duration: 0.7,
            })
            .to(".footer__bicycle", {
                x: 1000,
                y: -145,
                rotate: 45,
                duration: 2.0,
            })
            .to(".footer__bicycle", {
                x: 1150,
                y: -10,
                rotate: 40,
                duration: 1,
            })
            .to(".footer__bicycle", {
                x: 1200,
                y: 0,
                rotate: 0,
                duration: 0.3,
            })
            .to(".footer__bicycle", {
                x: 1500,
                y: 0,
                rotate: -60,
                opacity: 0,
            });
    }
}

//* Из числа в цену
halfedPrice();
function halfedPrice() {
    let priceArr = document.querySelectorAll("._price");
    for (let index = 0; index < priceArr.length; index++) {
        const priceArrItem = priceArr[index];
        let newPrice = priceArrItem.innerHTML.replace(
            /(\d)(?=(\d\d\d)+([^\d]|$))/g,
            "$1 "
        );
        priceArrItem.innerHTML = newPrice;
    }
}

// Скрываем Header по скроллу
headerHide();
function headerHide() {
    let line = document.querySelector("._header-hidden");
    let toggle = false;
    window.addEventListener("scroll", function () {
        if (this.scrollY >= 100 && toggle === false) {
            _slideUp(line, 300);
            toggle = true;
        }
        if (this.scrollY <= 100 && toggle === true) {
            _slideDown(line, 300);
            toggle = false;
        }
    });
}

// Прелоадер
preloader();
function preloader() {
    const delay = 700;

    body_lock_add(0);
    window.addEventListener("load", () => {
        let loader = document.querySelector(".loader");
        if (loader) {
            loader.style.opacity = 0;
            setTimeout(() => {
                loader.style.display = "none";
                body_lock_remove(0);
            }, delay);
        }
    });
}

//Всплывающие подсказки
tippyInit();
function tippyInit() {
    tippy("[data-tippy-content]");
}

//*Сортируем каталог (техническая)
//СОРТИРОВКА ПО ВОЗРАСТАНИЮ ЦЕНЫ
function ASC(a, b) {
    return a.price[0] - b.price[0];
}

//СОРТИРОВКА ПО УБЫВАНИЮ ЦЕНЫ
function DSC(a, b) {
    return b.price[0] - a.price[0];
}

//! Получаем данные из массива GET
function $_GET(key) {
    let p = window.location.search;
    p = p.match(new RegExp(key + "=([^&=]+)"));
    return p ? p[1] : false;
}

//=================================================================================================

// Редактируем фильтр

editBage();
async function editBage() {
    let checkFilters = document.querySelectorAll(".bf-panel-wrapper");
    if (checkFilters.length) {
        let promise = new Promise((resolve, reject) => {
            window.addEventListener("load", () => resolve(true));
        });
        await promise; // будет ждать, пока промис не выполнится (*)

        let body = document.querySelector(".bf-float-submit");
        let inner = body.innerHTML;

        // Wrapper
        let wrapper = document.createElement("div");
        wrapper.classList.add("bf-wrapper");
        wrapper.innerHTML = inner;
        body.innerHTML = "";
        body.appendChild(wrapper);

        let priceBody = document.querySelector(".bf-price-filter .bf-cur-symb");
        minInput = priceBody.querySelector(".bf-range-min");
        maxInput = priceBody.querySelector(".bf-range-max");
        let minDiv = document.createElement("div");
        let maxDiv = document.createElement("div");
        minDiv.classList.add("bf-pre-range");
        maxDiv.classList.add("bf-pre-range");
        minDiv.innerHTML = "от";
        maxDiv.innerHTML = "до";
        priceBody.insertBefore(minDiv, minInput);
        priceBody.insertBefore(maxDiv, maxInput);
    }
}

// Функция сброса фильтра
function defaultSort() {
    let bodyFilter = document.querySelector(".bf-panel-wrapper");
    let checkboxes = bodyFilter.querySelectorAll("._checkbox");
    checkboxes.forEach((checkbox) => {
        checkbox.classList.remove("_active");
    });

    let getArr = ["sort", "order", "limit", "bfilter"];
    function clearGET(paramArr) {
        let href = document.location.href;
        paramArr.map((param) => {
            const paramStr = `${param}=${$_GET(param)}`;
            href = href.replace(paramStr, "");
            href = href.replace("&&&&", "");
            href = href.replace("&&&", "");
            href = href.replace("&&", "");
        });
        return href;
    }
    document.location.href = clearGET(getArr);
}

// Клик по CheckBox
clickCheckBoxFilter();
function clickCheckBoxFilter() {
    let checkFilters = document.querySelectorAll(".bf-panel-wrapper");
    if (checkFilters.length) {
        checkFilters.forEach((checkFilter) => {
            let checkboxes = checkFilter.querySelectorAll("._checkbox");
            checkboxes.forEach((checkbox) => {
                let parentCheckbox = checkbox.closest(".bf-attr-filter");
                parentCheckbox.addEventListener("click", () => {
                    BrainyFilter.sendRequest();
                });
            });
        });
    }
}



delayQuery = 200;

setTimeout(() => {
    selectRegion();
}, delayQuery);

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("select__option")) {
        let check = e.target
            .closest(".select")
            .querySelectorAll("#input-country");
        if (check.length) {
            setTimeout(() => {
                selectRegion();
            }, delayQuery);
        }
    }
});

function selectRegion() {
    let check = document.querySelectorAll("#account-address");
    if (check.length) {
        let selectOrig = document.querySelectorAll("select");
        selectOrig.forEach((select) => {
            if (select.getAttribute("name") == "country_id") {
                test(select.value);
                setTimeout(() => {
                    selectInit();

                    let selectArr = document.querySelectorAll(
                        ".select__options"
                    );
                    for (let index = 0; index < selectArr.length; index++) {
                        const select = selectArr[index];
                        let optionsArr = select.querySelectorAll(
                            ".select__option"
                        );
                        optionsArr.forEach((option) => {
                            option.addEventListener("click", (e) => {
                                if (
                                    e.target
                                        .closest(".select")
                                        .querySelector("#input-country")
                                ) {
                                    test(option.getAttribute("data-value"));
                                    setTimeout(() => {
                                        selectInit();
                                    }, delayQuery);
                                }
                            });
                        });
                    }
                }, delayQuery);
            }
        });
    }
}
