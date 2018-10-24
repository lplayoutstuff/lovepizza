(function () {
    document.addEventListener("DOMContentLoaded", function () {
        //Util
        window.choose$ = function (selector, cb) {
            var selectors = document.querySelectorAll(selector);
            if (selectors[0]) {
                [].forEach.call(selectors, cb);
            }
        };

        //Появление Шапки
        var $header = document.querySelector('.header');
        var headerHeight = $header.offsetHeight;

        function scrollCheck() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > headerHeight) {
                $header.classList.add('is-sticky')
            } else {
                $header.classList.remove('is-sticky');
            }
        }

        scrollCheck();
        window.addEventListener('scroll', scrollCheck);


        //Slider Index page
        if (document.getElementById('slider')) {
            var slider = tns({
                container: '#slider',
                controlsContainer: "#sliderControls",
                autoplay: true,
                autoplayHoverPause: true,
                autoplayTimeout: 3500,
                autoplayButtonOutput: false,
                mode: "gallery",
                speed: 1000

            });
        }

        //Carousel Recommendations
        if (document.getElementById('recommendations')) {
            var recommendations = tns({
                container: '#recommendations',
                controlsContainer: "#recommendationControls",
                fixedWidth: 305,
                gutter: 0,

                swipeAngle: false,
                responsive: {
                    "740": {
                        gutter: 15,
                    },
                },
            });
        }
        //Popup
        function closePopup() {
            var $sticky = document.querySelector('.header.is-sticky');
            choose$('.popup', function (el) {
                el.classList.remove('is-show');
            });

            setTimeout(function(){
                document.body.classList.remove('has-popup');
                document.body.style.paddingRight = null;
                document.querySelector('footer').style.right = null;
                if ($sticky) {
                    $sticky.style.right = null;
                }
            }, 300);

        }

        function openPopup(id) {
            var scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            var $target = document.querySelector(id);
            var $sticky = document.querySelector('.header.is-sticky');

            $target.classList.add('is-show');
            document.body.classList.add('has-popup');
            document.body.style.paddingRight = scrollBarWidth + "px";
            document.querySelector('footer').style.right = scrollBarWidth + "px";
            if ($sticky) {
                $sticky.style.right = scrollBarWidth + "px";
            }
        }

        choose$('.popup', function (el) {
            el.addEventListener('click', function (event) {
                if (event.target !== event.currentTarget) return false;
                closePopup();
            });
        });

        choose$('[data-popup-close]', function (el) {
            el.addEventListener('click', closePopup);
        });

        //Вызов попапа по клику на [data-popup]
        choose$('[data-popup]', function (el) {
            el.addEventListener('click', function (event) {
                event.preventDefault()
                var popup = this.getAttribute("data-popup");
                openPopup(popup);

            });
        });


        //Бургер открытие
        document
            .querySelector('#burgerOpen')
            .addEventListener('click', function () {
                document.body.classList.add('is-openBurger')
            });
        //Бургер закрытие
        document
            .querySelector('#burgerClose')
            .addEventListener('click', function () {
                document.body.classList.remove('is-openBurger')
            })

        //Tabs and Lava

        function chooseLava(el) {
            var $parent = el.parentNode;
            var $lava = $parent.nextElementSibling;
            var $activeTab = el;
            var left = $activeTab.offsetLeft;
            var width = $activeTab.offsetWidth;
            $lava.style.left = left - 1 + "px";
            $lava.style.width = width + 2 + "px";
        }

        choose$('.js-tabItem.is-active', function (el) {
            chooseLava(el)
        });
        choose$('.js-tabItem', function (el) {
            el.addEventListener('click', function () {
                if (el.classList.contains('is-active')) return false;
                var $tabs = el.parentNode.querySelectorAll('.js-tabItem');
                for (var tab = 0; tab < $tabs.length; tab++) {
                    $tabs[tab].classList.remove('is-active')
                }
                el.classList.add('is-active');
                chooseLava(el);
            })

        })


        //Open Product More (?)
        choose$('.js-productMore', function (el) {
            el.addEventListener('click', function () {
                var $body = el.parentNode;
                $body.classList.toggle('is-openMore');
            })
        });


    });
})();

