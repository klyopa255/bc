function ready(fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

const BCApp = {

  screenWidth: document.documentElement.clientWidth,

  isAnimationInProgress: false,

  elems: {

    header: document.querySelector('.page-header'),
    navBurger: document.querySelector('.main-nav__button'),
    navButton: document.querySelector('.nav-button'),
    navButtonTop: document.querySelector('.nav-button--top'),
    navButtonNext: document.querySelector('.nav-button--next'),
    lang: document.querySelector('.lang'),
    langCurrent: document.querySelector('.lang__current'),
    langListWrapper: document.querySelector('.lang__list'),
    langList: document.querySelectorAll('.lang__item'),
    langAct: document.querySelector('.lang__item--current'),
    sectWrapper: document.querySelector('.sections__list'),
    sectList: document.querySelectorAll('.sections__item'),
    actSect: '',
    actSectPrev: '',
    sectContainer: document.querySelectorAll('.section__container'),
    sectContainerFaq: document.querySelector('.section__container--faq'),
    nav: document.querySelector('.main-nav'),
    navList: document.querySelectorAll('.main-nav__item'),
    navItemAct: ''

  },

  selectors: {

    headerActClass: 'page-header--active',
    navBurgerActClass: 'main-nav__button--active',
    navButtonActClass: 'nav-button--active',
    navButtonTopClass: 'nav-button--top',
    navButtonNextClass: 'nav-button--next',
    navButtonScrollClass: 'nav-button--scroll',
    langActClass: 'lang--active',
    langListWrapperActClass: 'lang__list--active',
    langItemClass: 'lang__item',
    langItemActClass: 'lang__item--current',
    navActClass: 'main-nav--active',
    navMobClass: 'main-nav--mobile',
    navItemActClass: 'main-nav__item--current',
    sectActClass: 'sections__item--active',
    sectNoDisplayClass: 'sections__item--nodisplay'

  },

  hashes: [],

  actClassToggle: function (el, actClass) {
    if (el && actClass) {
      el.classList.toggle(actClass);
    }
  },

  burgerNav: function () {

    this.elems.navBurger.addEventListener('click', (e) => {
      this.actClassToggle(this.elems.navBurger, this.selectors.navBurgerActClass);
      this.actClassToggle(this.elems.header, this.selectors.headerActClass);
      this.actClassToggle(this.elems.lang, this.selectors.langActClass);
      if (e.target.classList.contains(this.selectors.navBurgerActClass)) {
        this.elems.nav.classList.add(this.selectors.navActClass);
        this.elems.nav.classList.add(this.selectors.navMobClass);
      } else {
        this.elems.nav.classList.remove(this.selectors.navActClass);
        this.elems.nav.classList.remove(this.selectors.navMobClass);
        this.navDisplay(this.elems.navItemAct);
      }
    });

  },

  navDisplay: function (locationPoint) {

    if (locationPoint.dataset.num === '0' && this.screenWidth>1023) {
      this.elems.nav.classList.add(this.selectors.navActClass);
    } else if (locationPoint.dataset.num !== '0' &&  !this.elems.nav.classList.contains(this.selectors.navMobClass)) {
      this.elems.nav.classList.remove(this.selectors.navActClass);
    }

  },

  navButtonToggle: function (locationPoint) {

    if(+locationPoint.dataset.num === this.elems.navList.length-1) {

      this.elems.navButtonNext.classList.remove(this.selectors.navButtonActClass);
      this.elems.navButtonNext.classList.remove(this.selectors.navButtonScrollClass);
      this.elems.navButtonTop.classList.add(this.selectors.navButtonActClass);

    } else if(locationPoint.dataset.name === 'faq') {

      this.elems.navButtonNext.classList.add(this.selectors.navButtonScrollClass);
      this.elems.navButtonNext.classList.add(this.selectors.navButtonActClass);
      this.elems.navButtonTop.classList.remove(this.selectors.navButtonActClass);

      this.elems.sectContainerFaq.addEventListener('click', (e) => {
        setTimeout(()=>{
          console.log(this);
        },500);
      });

    } else {

      this.elems.navButtonNext.classList.add(this.selectors.navButtonActClass);
      this.elems.navButtonNext.classList.remove(this.selectors.navButtonScrollClass);
      this.elems.navButtonTop.classList.remove(this.selectors.navButtonActClass);

    }

  },

  navButtonClick: function () {
    this.elems.navButtonNext.addEventListener('click', (e)=> {
      e.preventDefault;
      this.countToggle(1);
    });
    this.elems.navButtonTop.addEventListener('click', (e) => {
      e.preventDefault();
      this.countToggle(-this.elems.navList.length+1);
    });
  },

  lang: function () {

    this.elems.lang.addEventListener('click', (e) => {
      this.actClassToggle(this.elems.langListWrapper, this.selectors.langListWrapperActClass);
      if(e.target.classList.contains(this.selectors.langItemClass)) {
        this.elems.langCurrent.innerHTML = e.target.dataset.name;
        this.elems.langAct.classList.remove(this.selectors.langItemActClass);
        e.target.classList.add(this.selectors.langItemActClass);
        this.elems.langAct = e.target;
      }
    });

  },

  menuToggle: function () {

    this.elems.navList.forEach((el, i) => {

      el.addEventListener('click', (e) => {

        e.preventDefault();
        this.elems.navItemAct.classList.remove(this.selectors.navItemActClass);
        el.classList.add(this.selectors.navItemActClass);
        this.elems.navItemAct = el;

        this.elems.actSectPrev = this.elems.actSect;
        this.elems.actSect.classList.remove(this.selectors.sectActClass);
        setTimeout(()=>this.elems.actSectPrev.classList.add(this.selectors.sectNoDisplayClass),1000);
        this.elems.sectList[i].classList.add(this.selectors.sectActClass);
        this.elems.sectList[i].classList.remove(this.selectors.sectNoDisplayClass);
        this.elems.actSect = this.elems.sectList[i];

        if (this.elems.nav.classList.contains(this.selectors.navMobClass)) {
          this.elems.header.classList.remove(this.selectors.headerActClass);
          this.elems.nav.classList.remove(this.selectors.navActClass);
          this.elems.nav.classList.remove(this.selectors.navMobClass);
          this.elems.lang.classList.remove(this.selectors.langActClass);
          this.elems.navBurger.classList.remove(this.selectors.navBurgerActClass);
        }

        if (this.screenWidth>1023) {
          this.navButtonToggle(el);
        }

        this.updateLocation(this.elems.actSect);

      });
    });
  },

  countToggle: function (indication) {

    if ((((+this.elems.navItemAct.dataset.num<this.elems.navList.length-1)&&(indication>0))||((+this.elems.navItemAct.dataset.num>0)&&(indication<0))) && !this.isAnimationInProgress ) {

      this.elems.navItemAct.classList.remove(this.selectors.navItemActClass);
      this.elems.navList[1*this.elems.navItemAct.dataset.num+indication].classList.add(this.selectors.navItemActClass);
      this.elems.navItemAct = this.elems.navList[1*this.elems.navItemAct.dataset.num+indication];

      this.elems.actSectPrev = this.elems.actSect;
      this.elems.actSect.classList.remove(this.selectors.sectActClass);
      setTimeout(()=>this.elems.actSectPrev.classList.add(this.selectors.sectNoDisplayClass),1000);
      this.elems.sectList[1*this.elems.actSect.dataset.num+indication].classList.add(this.selectors.sectActClass);
      this.elems.sectList[1*this.elems.actSect.dataset.num+indication].classList.remove(this.selectors.sectNoDisplayClass);
      this.elems.actSect = this.elems.sectList[1*this.elems.actSect.dataset.num+indication];

      this.updateLocation(this.elems.actSect);

      this.navButtonToggle(this.elems.navItemAct);

      this.animationTimeout(this.isAnimationInProgress);

    }
  },

  scroll: function () {
    this.elems.sectContainerFaq.addEventListener('scroll', (e)=> {
      if(this.elems.actSect.dataset.name === 'faq' && $('.faq-bottom').isOnScreen()) {
        this.elems.navButton.classList.remove(this.selectors.navButtonScrollClass);
      } else {
        this.elems.navButton.classList.add(this.selectors.navButtonScrollClass);
      }
    });
  },

  mouseWheel: function () {

    this.elems.sectWrapper.addEventListener('wheel', (e) => {

      if( this.elems.navItemAct.dataset.name !== 'faq' ) {

        e.preventDefault();
        if (e.deltaY>0) this.countToggle(1);
        else if (e.deltaY<0 ) this.countToggle(-1);

      } else {

        if (e.deltaY>0 && $('.faq-bottom').isOnScreen()) this.countToggle(1);
        else if (e.deltaY<0 && $('.faq-top').isOnScreen()) this.countToggle(-1);

      }

    });
  },

  location: function () {

    this.hashes = (() => {
      let hashes = [];
      this.elems.navList.forEach((el) => {
        hashes.push(el.dataset.name);
      });
      return hashes;
    })();
    if(location.hash!=='') {
      let hash = location.hash.slice(1),
          test;
      for(let i = this.hashes.length; i--;) {
        if (this.hashes[i] === hash) test = true;
      }
      if (test) {
        this.elems.navList.forEach((el, i, arr) => {
          if(el.dataset.name === hash) {
            el.classList.add(this.selectors.navItemActClass);
            this.elems.navItemAct = el;
          }
        });
        this.elems.sectList.forEach((el, i, arr) => {
          if(el.dataset.name === hash) {
            el.classList.add(this.selectors.sectActClass);
            this.elems.actSect = el;
          } else {
            el.classList.add(this.selectors.sectNoDisplayClass);
          }
        });
      }
    } else {
      this.elems.navList[0].classList.add(this.selectors.navItemActClass);
      this.elems.navItemAct = this.elems.navList[0];
      this.elems.sectList.forEach((el, i, arr) => {
        if(+el.dataset.num === 0) {
          el.classList.add(this.selectors.sectActClass);
          this.elems.actSect = el;
        } else {
          el.classList.add(this.selectors.sectNoDisplayClass);
        }
      });
      this.elems.actSect = this.elems.sectList[0];
    }

  },

  updateLocation: function (locationPoint) {

    location.hash = locationPoint.dataset.name;
    if (this.screenWidth>1023) {
      this.navDisplay(locationPoint);
    }

  },

  animationTimeout: function (animationState) {

    if(!animationState) {
      this.isAnimationInProgress = !this.isAnimationInProgress;
      setTimeout(()=>this.isAnimationInProgress = !this.isAnimationInProgress, 1000);
    }

  },

  run: function () {

    this.burgerNav();
    this.lang();
    this.location();
    this.menuToggle();

    if(this.screenWidth>1023) {
      this.mouseWheel();
      this.navDisplay(this.elems.navItemAct);
      this.navButtonToggle(this.elems.navItemAct);
      this.navButtonClick();
      this.scroll();
    }

  }

};

ready( function() {

  console.log('DOM ready');

  $.fn.isOnScreen = function() {
    var win = $(window);
    var viewport = {
      top: win.scrollTop(),
      left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
  };

  BCApp.run();

  if ($('.owl-carousel.owl-carousel').length) {
    $('.owl-carousel.owl-carousel').owlCarousel({
      items: 1,
      nav: true,
      dots: true,
      loop: true,
      //margin: 15,
    //   responsiveClass: true,
    //   responsive:{
    //     0:{
    //       items: 1,
    //       nav: false,
    //       dots: true
    //     },
    //     481:{
    //         items: 2,
    //         nav: true
    //     },
    //     767:{
    //         items: 3,
    //         nav: true
    //     }
    // }
    });
  }

  $(".accordion-item__line").click(function () {
    var container = $(this).parents(".accordion-list__item");
    var answer = container.find(".accordion-item");
    answer.toggleClass("accordion-item--opened");
  });

});
