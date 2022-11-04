const d = document;


function setHeaderTopPos(e) {
	let bxPanel = document.querySelector('#bx-panel')
    if (window.innerWidth > 1024) {
        const t = d.querySelector(".details"),
            a = d.querySelector(".header");
            if(bxPanel){
	            e.style.top = `${a.offsetHeight+t.offsetHeight + bxPanel.offsetHeight}px`
            } else {
	             e.style.top = `${a.offsetHeight+t.offsetHeight}px`
            }
       
    }
}

/*
function toggleNav() {
    const e = d.querySelector(".header-menu"),
        t = d.querySelectorAll(".details-nav__item");
    if (t)
        for (let a = 0; a < t.length; a++) t[a].addEventListener("mouseover", (function() {
            removeActiveClass(t), this.classList.add("active"); 
            let position = this.getBoundingClientRect(); 
            if(a === t.length - 1 || a === t.length - 2){
	            e.style.left = position.left - e.offsetWidth + position.width + 'px'
            }else {e.style.left = position.left + 'px'} slideNav(this), closeNavOnMouseOut(t[a]), closeNavOnLinkClick(e)
        }))
}
*/

function toggleNav() {
    const e = d.querySelector(".header-menu"),
        t = d.querySelectorAll(".details-nav__item");
    if (t)
        for (let a = 0; a < t.length; a++) t[a].addEventListener("mouseover", (function() {
            removeActiveClass(t), this.classList.add("active"); 
            let position = this.getBoundingClientRect(); 
            if(a === t.length - 1 || a === t.length - 2){
                e.style.left = 'unset'
              e.style.right = document.documentElement.clientWidth - position.right  + 'px'
            }else {e.style.left = position.left + 'px'} slideNav(this), closeNavOnMouseOut(t[a]), closeNavOnLinkClick(e)
        }))
}


function setTitleAttr(e, t) {
    if (e)
        for (let a = 0; a < e.length; a++) e[a].textContent.length > t && e[a].setAttribute("title", e[a].textContent)
}

function languageSelect() {
    const e = d.querySelector(".burger-menu__languages .lang-btn.current");
    e && e.addEventListener("click", (function() {
        this.classList.toggle("active"), this.nextElementSibling.classList.toggle("active")
    }))
}

function addActiveClass(e) {
    e.classList.add("active")
}

function toggleMobileNav() {
    const e = d.querySelectorAll(".details-nav__item"),
        t = d.querySelectorAll(".burger-menu__extra-nav");
    if (e)
        if (window.innerWidth >= 1025) removeID(t);
        else {
            removeID(e);
            for (let e = 0; e < t.length; e++) t[e].addEventListener("click", (function() {
                slideNav(this)
            }));
            // setExtraMenuHeight(),
            closeExtraMenu()
        }
}

function closeExtraMenu() {
    const e = d.querySelector(".header-menu");
    if (e) {
        e.addEventListener("click", (function(t) {
            !1 === t.target.classList.contains("header-menu__inner") && e.classList.remove("active")
        }));
        const t = d.querySelectorAll(".header-menu__inner"),
            a = d.querySelector(".header-menu__close");
        for (let n = 0; n < t; n++) {
            t[n].querySelector(".back-btn").addEventListener("click", (function() {
                e.classList.remove("active")
            })), a.addEventListener("click", (function() {
                e.classList.remove("active")
            }))
        }
    }
}

// function setExtraMenuHeight() {
//     const e = d.querySelector(".burger-menu__nav-list"),
//         t = d.querySelectorAll(".header-menu__inner");
//     if (e)
//         for (let a = 0; a < t.length; a++) t[a].style.height = `${e.offsetHeight}px`
// }

function sideMenu() {
    const e = d.querySelector(".burger-menu"),
        t = d.querySelector(".burger-btn");
    t && t.addEventListener("click", (function(t) {
        e.classList.toggle("opened"), document.body.classList.toggle("no-scroll"), this.classList.toggle("active")
    }))
}

function removeID(e) {
    for (let t = 0; t < e.length; t++) e[t].removeAttribute("id")
}

function removeActiveClass(e) {
    for (let t = 0; t < e.length; t++) e[t].classList.remove("active")
}

function slideNav(e) {
    const t = d.querySelector(".header-menu"),
        a = d.querySelectorAll(".header-menu__inner");
    if (t) {
        t.classList.add("active"), setHeaderTopPos(t);
        for (let t = 0; t < a.length; t++) a[t].dataset.id === e.id && (removeActiveClass(a), a[t].classList.add("active"))
    }
}

function closeNavOnMouseOut(e) {
    const t = d.querySelector(".header-menu"),
        a = d.querySelector(".header__inner"),
        n = d.querySelector(".header__info"),
        o = d.querySelector(".details__inner"),
        i = d.querySelector(".nav-container");
    t && t.classList.contains("active") && (t.addEventListener("mouseleave", (function(t) {
        t.relatedTarget && (t.relatedTarget.classList.contains("details-nav__item") || t.relatedTarget.classList.contains("details-nav") || t.relatedTarget.classList.contains("details__inner") || (this.classList.remove("active"), this.style.top = "-100%", e.classList.remove("active")))
    })), window.addEventListener("scroll", (function() {
        t.classList.remove("active"), t.style.top = "-100%", e.classList.remove("active")
    })), e.addEventListener("mouseleave", (function(e) {
        e.relatedTarget !== a && e.relatedTarget !== n && e.relatedTarget !== o && e.relatedTarget !== i || (t.classList.remove("active"), t.style.top = "-100%", this.classList.remove("active"))
    })))
}

function closeNavOnLinkClick(e) {
    const t = d.querySelectorAll(".slide-menu__list-link");
    if (t)
        for (let a = 0; a < t.length; a++) t[a].addEventListener("click", (function() {
            e.classList.remove("active")
        }))
}

function clearSearchInputOnBlur() {
    const e = d.querySelectorAll('input[type="search"]');
    if (e)
        for (let t = 0; t < e.length; t++) e[t].addEventListener("blur", (function() {
            this.value = ""
        }))
}

function toggleSearchVisibilty() {
    const e = d.querySelector(".global-search.desktop"),
        t = d.querySelector(".search-btn"),
        a = d.querySelector(".mob-nav__search-btn"),
        n = d.querySelector(".global-search__close");
    d.querySelector(".details"), d.querySelector(".header");
    e && (t.addEventListener("click", (function() {
        e.classList.toggle("visible")
    })), a.addEventListener("click", (function() {
        e.classList.toggle("visible")
    })), n.addEventListener("click", (function() {
        e.classList.toggle("visible")
    })), window.addEventListener("scroll", (function() {
        e.classList.contains("visible") && e.classList.toggle("visible")
    })))
}

function changeSearchID() {
    const e = d.querySelector(".global-search.desktop form"),
        t = d.querySelector(".global-search.desktop label"),
        a = d.querySelector(".global-search.mob form"),
        n = d.querySelector(".global-search.desktop input"),
        o = d.querySelector(".global-search.mob input"),
        i = d.querySelector(".global-search.mob label");
    e && (window.innerWidth >= 601 ? (i.removeAttribute("for"), a.removeAttribute("id"), o.removeAttribute("id")) : (t.removeAttribute("for"), e.removeAttribute("id"), n.removeAttribute("id")))
}

function clearInput() {
    const e = d.querySelectorAll(".search-inputs input"),
        t = d.querySelectorAll(".clear-btn");
    if (e)
        for (let a = 0; a < t.length; a++) t[a].addEventListener("click", (function(t) {
            t.preventDefault();
            for (let t = 0; t < e.length; t++) e[t].value = ""
        }))
}

function sortForm(e, t) {
    if (t) {
        t.addEventListener("click", (function() {
            e.classList.contains("active") || e.classList.add("opened")
        }));
        const a = e.querySelectorAll("li"),
            n = t.querySelector("input");
        for (let t = 0; t < a.length; t++) a[t].addEventListener("click", (function() {
            const o = a[t].textContent;
            n.value = o, e.classList.remove("opened")
        }))
    }
}

function bestGraduateSorting() {
    sortForm(d.querySelector(".sort-form__list"), d.getElementById("facultySearchLabel"))
}

function accordion() {
    const e = d.querySelectorAll(".accordion__content"),
        t = d.querySelectorAll(".mapEl"),
        a = "#941914";
    if (e)
        for (let n = 0; n < e.length; n++) e[0].style.maxHeight = e[0].scrollHeight + "px", d.getElementById("mapRu").style.fill = a, e[n].addEventListener("click", (function() {
            for (let t = 0; t < e.length; t++) e[t].classList.remove("active"), e[t].style.maxHeight && (e[t].style.maxHeight = null);
            for (let e = 0; e < t.length; e++) t[e].style.fill = "rgba(151, 140, 140, 0.3)";
            switch (this.classList.toggle("active"), this.style.maxHeight ? this.style.maxHeight = null : this.style.maxHeight = this.scrollHeight + "px", this.id) {
                case "rus":
                    d.getElementById("mapRu").style.fill = a;
                    break;
                case "est":
                    d.getElementById("mapEs").style.fill = a;
                    break;
                case "lat":
                    d.getElementById("mapLV").style.fill = a;
                    break;
                case "ger":
                    d.getElementById("mapGe").style.fill = a;
                    break;
                case "bel":
                    d.getElementById("mapBy").style.fill = a
            }
        }))
}

function togglePagination() {
    const e = d.querySelectorAll(".pagination__list li");
    if (e) {
        stopLinks();
        for (let t = 0; t < e.length; t++) e[t].addEventListener("click", (function() {
            "more" !== this.dataset.page && (removeActiveClass(e), this.classList.add("active"))
        }))
    }
}

function stopLinks() {
    const e = d.querySelectorAll(".pagination__list li a");
    if (e)
        for (let t = 0; t < e.length; t++) e[t].addEventListener("click", (function(e) {
            e.preventDefault()
        }))
}

function toggleCheckboxes() {
    const e = d.querySelectorAll(".sort__chkbx");
    if (e)
        for (let t = 0; t < e.length; t++) e[t].addEventListener("click", (function() {
            removeActiveClass(e), this.classList.add("active")
        }))
}

function getParLength(e) {
    for (let t = 0; t < e.length; t++) {
        e[t].textContent.length > 68 && e[t].classList.add("long")
    }
}
languageSelect(), sideMenu(), toggleNav(), clearSearchInputOnBlur(), toggleSearchVisibilty(), changeSearchID(), clearInput(), bestGraduateSorting(), $(document).ready((function() {
        const e = $("html, body");

        function t(e, t) {
            e.on("init reInit", (function(e, a) {
                let n = a.slideCount;
                if(n === null) return;
                t.attr("max", n)
            })), e.on("afterChange", (function(e, a, n) {
                t.val(n + 1)
            })), e.slick({
                slidesToShow: 1,
                centerMode: !0,
                arrows: !0,
                infinite: !0,
                dots: !1,
                swipeToSlide: true,
                prevArrow: "<img src='bitrix/templates/bsu_2021/img/graduate-stud/slide-arrow-prev.png' class='prev' alt='Предыдущий'>",
                nextArrow: "<img src='bitrix/templates/bsu_2021/img/graduate-stud/slide-arrow-next.png' class='next' alt='Следующий'>"
            })
        }

        function a(e) {
            e.slick({
                responsive: [{
                    breakpoint: 5e3,
                    settings: "unslick"
                }, {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 1,
                        centerMode: !0,
                        arrows: !1,
                        infinite: !0,
                        dots: !0,
                        variableWidth: !0
                    }
                }]
            }), window.addEventListener("resize", (function() {
                window.innerWidth < 1025 && e.slick("refresh")
            }))
        }

        function n(e) {
            e.slick({
                responsive: [{
                    breakpoint: 5e3,
                    settings: "unslick"
                }, {
                    breakpoint: 601,
                    settings: {
                        slidesToShow: 1,
                        centerMode: !0,
                        arrows: !1,
                        infinite: !0,
                        dots: !0,
                        variableWidth: !0
                    }
                }]
            }), window.addEventListener("resize", (function() {
                window.innerWidth < 601 && e.slick("refresh")
            }))
        }

        function o(e) {
            e.slick({
                responsive: [{
                    breakpoint: 5e3,
                    settings: "unslick"
                }, {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 2,
                        centerMode: !1,
                        arrows: !1,
                        infinite: !0,
                        dots: !0,
                        variableWidth: !0
                    }
                }, {
                    breakpoint: 600,
                    settings: "unslick"
                }]
            }), window.addEventListener("resize", (function() {
                window.innerWidth < 1025 && e.slick("refresh")
            }))
        }
        var i;
        $('a[href*="#"]').click((function() {
            return e.animate({
                scrollTop: $($.attr(this, "href")).offset().top
            }, 400), !1
        })), $(".main-slider").slick({
            prevArrow: "<img src='bitrix/templates/bsu_2021/img/mainPage/main-slider/main-slider-prev-arrow.png' class='prev' alt='Предыдущий'>",
            nextArrow: "<img src='bitrix/templates/bsu_2021/img/mainPage/main-slider/main-slider-next-arrow.png' class='next' alt='Следующий'>",
            dots: !0,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    arrows: !1
                }
            }]
		        }), $(window).width() > 768 && (t($("#schoolsSlider"), $("#schoolsRangeBar")), t($("#sportsSlider"), $("#sportsRangeBar")), t($("#culturesSlider"), $("#culturesRangeBar")), t($("#creativeSlider"), $("#creativeRangeBar")), t($("#selfgovSlider"), $("#selfgovRangeBar"))), a($(".news-slider")), a($("#podcasts-slider")), a($(".news-mob-slider")), a($("#congrats-slider")), n($("#feature-slider")), n($("#sportsSlider")), n($("#culturesSlider")), n($("#creativeSlider")), n($("#selfgovSlider")), n($(".news-elem__content")), n($(".video-block__content")), n($(".grants__content")), n($(".culture__content")), n($("#coopFeatureSlider")), n($("#assocSlider")), n($(".books__content")), (i = $("#blog-slider")).slick({
            responsive: [{
                breakpoint: 5e3,
                settings: "unslick"
            }, {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 1,
                    centerMode: !1,
                    arrows: !1,
                    infinite: !0,
                    dots: !0,
                    variableWidth: !0
                }
            }]
        }), window.addEventListener("resize", (function() {
            window.innerWidth < 1025 && i.slick("refresh")
        })), window.innerWidth > 1280 && (setTitleAttr(d.querySelectorAll(".news__description"), 100), setTitleAttr(d.querySelectorAll(".news-card__desc"), 100), setTitleAttr(d.querySelectorAll(".book__descr"), 56)), toggleMobileNav(), changeSearchID(), $(window).width() < 1025 && $(".news-slider").slick("slickRemove", 6), $(window).width() < 769 && (a($("#schoolsSlider")), o($("#sportsSlider")), o($("#culturesSlider")), o($("#creativeSlider")), o($("#selfgovSlider"))), $(window).width() < 534 && a($(".gallery-block__content")), window.addEventListener("resize", (function() {
            window.innerWidth > 1280 && (setTitleAttr(d.querySelectorAll(".news__description"), 100), setTitleAttr(d.querySelectorAll(".news-card__desc"), 100), setTitleAttr(d.querySelectorAll(".book__descr"), 56)), toggleMobileNav(), changeSearchID(), window.innerWidth < 1025 && $("#congrats-slider").slick({
                slidesToShow: 1,
                centerMode: !0,
                arrows: !1,
                infinite: !0,
                dots: !0,
                variableWidth: !0
            }), $(window).width() < 1025 && $(".news-slider").slick("slickRemove", 6), $(window).width() < 769 && (a($("#schoolsSlider")), o($("#sportsSlider")), o($("#culturesSlider")), o($("#creativeSlider")), o($("#selfgovSlider"))), $(window).width() <= 601 && (a($("#feature-slider")), a($("#sportsSlider"), $("#sportsRangeBar")), a($("#creativeSlider")), a($("#culturesSlider"), $("#culturesRangeBar")), a($("#selfgovSlider")), a($(".news-elem__content")), a($(".video-block__content")), a($(".grants__content")), a($(".culture__content")), a($("#coopFeatureSlider")), a($("#assocSlider")), a($(".books__content"))), $(window).width() < 534 && a($(".gallery-block__content"))
        }))
    })), accordion(),
    function() {
        var lang = {
                en: {
                    x: "Close",
                    nex: "Next month",
                    pre: "Previous month",
                    clear: "Clear",
                    m: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
                    mo: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    w: "Mo</td><td>Tu</td><td>We</td><td>Th</td><td>Fr</td><td>Sa</td><td>Su"
                },
                ru: {
                    x: "Закрыть",
                    nex: "Следующий месяц",
                    pre: "Предыдущий месяц",
                    clear: "Очистить",
                    m: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
                    mo: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                    w: "Пн</td><td>Вт</td><td>Ср</td><td>Чт</td><td>Пт</td><td>Сб</td><td>Вс"
                }
            },
            def = {
                lang: "ru",
                id: "",
                class: "xcalend",
                delim: ".",
                order: 0,
                o: {
                    value: ""
                },
                year: -1,
                month: -1,
                dat: -1,
                day: -1,
                dop: "",
                autoOn: 1,
                autoOff: 1,
                now: 1,
                set0: 0,
                x: 1,
                hide: 1,
                to: "",
                fn: ""
            };

        function iss(e) {
            return null != e
        }

        function Nod(e) {
            return "string" == typeof e && (e = document.getElementById(e)), e
        }

        function Del(e) {
            (e = Nod(e)) && ("function" == typeof e.remove ? e.remove() : e.parentNode.removeChild(e))
        }

        function HTM(e, t, a) {
            iss(a) || (a = "beforeend"), Nod(e).insertAdjacentHTML(a, t)
        }

        function Eve(e, t, a) {
            e.addEventListener ? e.addEventListener(t, a, !1) : e.attachEvent ? e.attachEvent("on" + t, a) : e["on" + t] = a
        }

        function scrol(e) {
            var t = {
                X: "scrollLeft",
                Y: "scrollTop"
            };
            return void 0 !== e && e in t || (e = "Y"), window["page" + e + "Offset"] || document.documentElement[t[e]] || document.body[t[e]]
        }
        window.xCal = function(ob, delim, order) {
            var a = {};
            for (var key in def) a[key] = def[key];
            if ("object" == typeof delim)
                for (var key in delim) a[key] = delim[key];
            else iss(delim) && (a.delim = delim), iss(order) && (a.order = order);
            if ("" === a.id && (a.id = a.class), "object" != typeof ob) {
                if ((void 0 === ob || 0 == ob || 1 == ob) && Nod(a.id)) return 1 == a.hide && ("string" != typeof delim ? Nod(a.id).style.display = "none" : Nod(delim).style.display = "none"), !1;
                if (2 == ob || "now" === ob) {
                    var D = new Date,
                        d = D.getDate(),
                        m = D.getMonth() + 1,
                        y = D.getFullYear();
                    return d < 10 && (d = "0" + d), m < 10 && (m = "0" + m), 1 == a.order ? y + a.delim + m + a.delim + d : 2 == a.order ? m + a.delim + d + a.delim + y : d + a.delim + m + a.delim + y
                }
            }
            if (a.o = Nod(ob), a.f = function() {
                    var m = a.month + 1,
                        d = a.dat,
                        y = a.year;
                    a.sdat = a.dat, a.smonth = a.month, a.syear = a.year, 1 == a.order ? (d = y, y = a.dat) : 2 == a.order && (d = m, m = a.dat), y < 10 && (y = "0" + y), m < 10 && (m = "0" + m), d < 10 && (d = "0" + d), d += a.delim + m + a.delim + y, "" !== a.dop && (d += " " + a.dop), a.o && (a.o.value = xCal.value = d), 1 == a.hide && (Nod(a.id).style.display = "none"), "function" == typeof a.fn ? a.fn(d, a) : "string" == typeof a.fn && "" !== a.fn && eval(a.fn + "('" + d + "');")
                }, void 0 === a.o) return !1;
            a = xCal.gVal(a), a = xCal.gDat(a), Nod(a.id) ? Nod(a.id).style.display = "" : ("" == a.to ? a.to = document.body : a.to = Nod(a.to), HTM(a.to, '<table id="' + a.id + '" class="' + a.class + '"><thead></thead><tbody></tbody><tfoot></tfoot></table>'));
            var oo = a.o.getBoundingClientRect();
            return Nod(a.id).style.left = oo.left + scrol("X") + "px", Nod(a.id).style.top = oo.bottom + scrol() + "px", xCal.fM = function(e) {
                var t = e.month,
                    a = "",
                    n = 1,
                    o = lang[e.lang].m;
                a += '<td colspan=2 title="12"', 11 == t ? a += ' class="today"' : 11 == e.tmonth && (a += ' class="tday"'), a += ">" + lang[e.lang].m[11] + "</td>";
                for (var i = 0; i < o.length - 1; i++) n++, a += '<td colspan=2 title="' + (i + 1) + '"', t == i ? a += ' class="today"' : e.tmonth == i && (a += ' class="tday"'), a += ">" + o[i] + "</td>", n > 2 && (a += "</tr><tr>", n = 0);
                Del(document.querySelector("#" + e.id + " tbody")), HTM(e.id, "<tbody><tr><th rowspan=4 valign=bottom></th>" + a + "</tr></tbody>");
                var l = document.querySelectorAll("#" + e.id + " tbody td");
                for (i = 0; i < l.length; i++) l[i].onclick = function() {
                    var t = this.title;
                    "" != t && (e.month = parseInt(t) - 1, xCal.f(e))
                }
            }, xCal.fY = function(e) {
                for (var t = e.year, a = "", n = 0, o = -8; o < 7; o++) n++, a += "<td colspan=2", t == t + o ? a += ' class="today"' : e.tyear == t + o && (a += ' class="tday"'), a += ">" + (t + o) + "</td>", n > 2 && (a += "</tr><tr>", n = 0);
                Del(document.querySelector("#" + e.id + " tbody")), HTM(e.id, "<tbody><tr><th rowspan=5 valign=bottom></th>" + a + "</tr></tbody>");
                var i = document.querySelectorAll("#" + e.id + " tbody td");
                for (o = 0; o < i.length; o++) i[o].onclick = function() {
                    var t = this.innerHTML;
                    "" != t && "&nbsp;" != t && (e.year = parseInt(t), xCal.f(e))
                }
            }, xCal.f = function(a) {
                Del(document.querySelector("#" + a.id + " thead")), Del(document.querySelector("#" + a.id + " tbody")), Del(document.querySelector("#" + a.id + " tfoot"));
                var mm, y = a.year,
                    m = a.month,
                    dat = a.dat,
                    Dlast = new Date(y, m + 1, 0).getDate(),
                    DNlast = new Date(y, m, Dlast).getDay(),
                    DNfirst = new Date(y, m, 1).getDay(),
                    ca = "",
                    j = 0,
                    months = lang[a.lang].mo;
                j = 0 != DNfirst ? DNfirst - 1 : 6, HTM(a.id, '<thead><tr><td class="cal-l" title="' + lang[a.lang].pre + '"><</td><td colspan=3 class="cal-m"></td><td colspan=2 class="cal-y"></td><td class="cal-r" title="' + lang[a.lang].nex + '"> > </td></tr><tr><td>' + lang[a.lang].w + "</td></tr></thead>"), j > 0 && (mm = 0 == m ? 11 : m - 1, ca += j > 1 ? "<td colspan=" + j + ' class="cal-l" align=left title="' + lang[a.lang].pre + " " + lang[a.lang].mo[mm] + '"><b>' + lang[a.lang].m[mm] + "</b></td>" : '<td class="cal-l" title="' + lang[a.lang].pre + " " + lang[a.lang].mo[mm] + '"><b></b></td>');
                for (var i = 1; i <= Dlast; i++) j++, ca += "<td", i == dat ? m == a.smonth && y == a.syear ? ca += ' class="today"' : ca += ' class="tday"' : i == a.tdat && m == a.tmonth && y == a.tyear && (ca += ' class="tday"'), ca += ">" + i + "</td>", j > 6 && (ca += "</tr><tr>", j = 0);
                DNlast > 0 && (mm = m > 10 ? 0 : m + 1, ca += DNlast < 6 ? "<td colspan=" + (7 - DNlast) + ' class="cal-r" align=right title="' + lang[a.lang].nex + " " + lang[a.lang].mo[mm] + '"><b>' + lang[a.lang].m[mm] + "</b></td>" : '<td class="cal-r" title="' + lang[a.lang].nex + " " + lang[a.lang].mo[mm] + '"><b> </b></td>'), HTM(a.id, '<tbody><tr class="cal-first">' + ca + "</tr></tbody>"), ca = "";
                var k, kk = [3, 3, 1];
                a.now || (kk[0] = 0), a.set0 || (kk[1] = 0), a.x || (kk[2] = 0), a.now && (k = kk[0] + kk[1] + kk[2], k < 7 && (kk[0] += 7 - k), ca += "<td colspan=" + kk[0] + ' class="cal-nw"></td>'), a.set0 && (k = kk[0] + kk[1] + kk[2], k < 7 && (kk[1] += 7 - k), ca += "<td colspan=" + kk[1] + ' class="cal-s0">' + lang[a.lang].clear + "</td>"), a.x && (k = kk[0] + kk[1] + kk[2], k < 7 && (kk[2] += 7 - k), ca += "<td colspan=" + kk[2] + " onClick=\"document.getElementById('" + a.id + "').style.display='none'\" title=\"" + lang[a.lang].x + '" class="bold">' + (kk[2] > 2 ? lang[a.lang].x : "&#215;") + "</td>"), HTM(a.id, "<tfoot><tr>" + ca + "</tr></tfoot>"), document.querySelector("#" + a.id + " thead td.cal-m").innerHTML = months[m], document.querySelector("#" + a.id + " thead td.cal-y").innerHTML = y, document.querySelector("#" + a.id + " thead td.cal-l").onclick = function() {
                    xCal.mmm(a)
                }, document.querySelector("#" + a.id + " thead td.cal-r").onclick = function() {
                    xCal.mpp(a)
                }, document.querySelector("#" + a.id + " thead td.cal-m").onclick = function() {
                    xCal.fM(a)
                }, document.querySelector("#" + a.id + " thead td.cal-y").onclick = function() {
                    xCal.fY(a)
                }, k = document.querySelector("#" + a.id + " tfoot td.cal-nw"), k && (k.innerHTML = xCal(2, a), k.onclick = function() {
                    var dop = "";
                    if (a = xCal.gDop(a), "" != a.dop && (dop = " " + a.dop), a.o && (a.o.value = xCal.value = this.innerHTML + dop), 1 == a.hide) document.getElementById(a.id).style.display = "none";
                    else {
                        for (var o = document.querySelectorAll("#" + a.id + " .today"), j = 0; j < o.length; j++) o[j].className = "";
                        a = xCal.gDat(a);
                        var D = new Date;
                        a.year = D.getFullYear(), a.month = D.getMonth(), a.dat = D.getDate()
                    }
                    a.sdat = a.dat, a.smonth = a.month, a.syear = a.year, "function" == typeof a.fn ? a.fn(this.innerHTML, a) : "string" == typeof a.fn && "" !== a.fn && eval(a.fn + "('" + this.innerHTML + "');"), 1 != a.hide && xCal.f(a)
                }), k = document.querySelector("#" + a.id + " tfoot td.cal-s0"), k && (k.onclick = function() {
                    var e = "00" + a.delim + "00" + a.delim + "00";
                    1 == a.order ? e = "00" + e : e += "00", a.o && (a.o.value = xCal.value = e), a.sdat = a.dat, a.smonth = a.month, a.syear = a.year, 1 == a.hide && (document.getElementById(a.id).style.display = "none")
                }), a.autoOff && (Nod(a.id).onmouseleave = function() {
                    xCal()
                });
                for (var k = document.querySelectorAll("#" + a.id + " tbody td"), i = 0; i < k.length; i++) k[i].onclick = function() {
                    var e = this.innerHTML;
                    if ("" != e && "&nbsp;" != e) {
                        if (1 != a.hide) {
                            for (var t = document.querySelectorAll("#" + a.id + " .today"), n = 0; n < t.length; n++) t[n].className = "";
                            this.className = "today"
                        }(a = xCal.gDop(a)).dat = e, "function" == typeof a.f && a.f(a.id)
                    }
                };
                var r = document.querySelector("#" + a.id + " tbody td.cal-l");
                null != r && (r.onclick = function() {
                    xCal.mmm(a)
                }), r = document.querySelector("#" + a.id + " tbody td.cal-r"), null != r && (r.onclick = function() {
                    xCal.mpp(a)
                })
            }, xCal.f(a), !1
        }, xCal.mmm = function(e) {
            e.month -= 1, e.month < 0 && (e.month = 11, e.year--), xCal.f(e)
        }, xCal.mpp = function(e) {
            e.month += 1, e.month > 11 && (e.month = 0, e.year++), xCal.f(e)
        }, xCal.gDop = function(e) {
            if (void 0 === e.o && (e.o = {
                    value: ""
                }), void 0 === e.o.value || "" === e.o.value) return e;
            var t = e.o.value.split(" ");
            return iss(t[1]) ? e.dop = t[1] : e.dop = "", e
        }, xCal.gVal = function(e) {
            if (void 0 === e.o && (e.o = {
                    value: ""
                }), void 0 === e.o.value || "" === e.o.value) return e;
            var t = e.o.value.split(" ");
            iss(t[1]) ? e.dop = t[1] : e.dop = "", t = t[0].split(e.delim);
            for (var a = 0; a < 3; a++) iss(t[a]) || (t[a] = -1);
            return 2 == e.order ? (t[3] = t[1], t[1] = t[0], t[0] = t[3], t[1] = parseInt(t[1]) - 1) : (1 == e.order && (t[3] = t[2], t[2] = t[0], t[0] = t[3]), t[1] = parseInt(t[1]) - 1), e.syear = e.year = parseInt(t[2]), e.smonth = e.month = t[1], e.sdat = e.dat = parseInt(t[0]), e
        }, xCal.gDat = function(e) {
            var t = new Date;
            return e.tyear = t.getFullYear(), e.tmonth = t.getMonth(), e.tdat = t.getDate(), e.tday = t.getDay(), e.month > -1 && (e.year < 0 && (e.year = t.getFullYear()), e.dat > 0 ? t.setFullYear(e.year, e.month, e.dat) : t.setFullYear(e.year, e.month)), e.year = t.getFullYear(), e.month = t.getMonth(), e.dat = t.getDate(), e.day = t.getDay(), e.sdat = e.dat, e.smonth = e.month, e.syear = e.year, e
        }, xCal.set = function(e) {
            for (var t in e) def[t] = e[t]
        }, xCal.all = function(e, t, a) {
            var n;
            if (void 0 !== e && "" != e && !((n = document.getElementsByClassName ? document.getElementsByClassName(e) : document.querySelectorAll("." + e)).length < 1))
                for (var o = 0; o < n.length; o++) {
                    var i = n[o];
                    Eve(i, "input", (function() {
                        xCal()
                    })), Eve(i, "keyup", (function() {
                        xCal()
                    })), Eve(i, "click", (function() {
                        xCal(this, t, a)
                    })), "object" == typeof t ? "autoOn" in t && t.autoOn && Eve(i, "mouseenter", (function() {
                        xCal(this, t, a)
                    })) : def.autoOn && Eve(i, "mouseenter", (function() {
                        xCal(this, t, a)
                    }))
                }
        }
    }(), togglePagination(), toggleCheckboxes();
const paragraph = d.querySelectorAll(".project__title");

function toggleMenuCat(e, t) {
    for (let t = 0; t < e.length; t++) e[t].addEventListener("click", (function() {
        removeActiveClass(e), this.classList.add("active")
    }))
}

function reInitSlider(e) {
    for (let t = 0; t < e.length; t++) e[t].addEventListener("click", (function() {
        removeActiveClass(e), window.innerWidth < 1024 && ($(".news-slider").slick("refresh"), $(".news-slider").slick("slickRemove", 6)), this.classList.add("active")
    }))
}

function toggleNewsCat() {
    const e = d.querySelectorAll("#news .section-nav__item"),
        t = d.querySelectorAll("#ann .section-nav__item");
    e && (toggleMenuCat(e), reInitSlider(e)), t && toggleMenuCat(t)
}

function ifHiddenSidebar() {
    const e = d.querySelector(".sections-wrap"),
        t = d.querySelector(".side-news"),
        a = d.querySelector(".ann-content"),
        n = d.querySelector(".congrats");
    e && (window.innerWidth > 1025 ? (console.log("yes"), t || e.classList.add("only")) : e.classList.remove("only"), n || a.classList.add("only"))
}
paragraph && getParLength(paragraph), $(document).ready((function() {
    $("#mobileSort").slick({
        dots: !1,
        arrows: !1,
        responsive: [{
            breakpoint: 5e3,
            settings: "unslick"
        }, {
            breakpoint: 601,
            settings: {
                slidesToShow: 1,
                arrows: !1,
                infinite: !1,
                dots: !1,
                variableWidth: !0
            }
        }]
    })
})), $(document).ready((function() {
    $(".info-block__slider").slick({
        prevArrow: "<img src='bitrix/templates/bsu_2021/img/mainPage/main-slider/main-slider-prev-arrow.png' class='prev' alt='Предыдущий'>",
        nextArrow: "<img src='bitrix/templates/bsu_2021/img/mainPage/main-slider/main-slider-next-arrow.png' class='next' alt='Следующий'>",
        dots: !1,
        fade: !0
    }), $(".typo-page__slider").slick({
        prevArrow: "<img src='bitrix/templates/bsu_2021/img/mainPage/main-slider/main-slider-prev-arrow.png' class='prev' alt='Предыдущий'>",
        nextArrow: "<img src='bitrix/templates/bsu_2021/img/mainPage/main-slider/main-slider-next-arrow.png' class='next' alt='Следующий'>",
        dots: !0,
        fade: !0,
        responsive: [{
            breakpoint: 1025,
            settings: {
                arrows: !1
            }
        }]
    }), $(".typo-page__img a").magnificPopup({
        type: "image",
        fixedContentPos: !0,
        mainClass: "mfp-fade"
    }), $(".typo-page__video a").magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: !1,
        fixedContentPos: !0
    })
})), window.addEventListener("resize", (function() {
    $(".typo-page__slider").slick("refresh"), $(".info-block__slider").slick("refresh")
})), toggleNewsCat(), ifHiddenSidebar(), window.addEventListener("resize", ifHiddenSidebar);