const flsModules = {}
function getHash() {
  if (location.hash) { return location.hash.replace('#', ''); }
}
function dataMediaQueries(array, dataSetValue) {
  // Получение объектов с медиа запросами
  const media = Array.from(array).filter(function (item, index, self) {
    if (item.dataset[dataSetValue]) {
      return item.dataset[dataSetValue].split(",")[0];
    }
  });
  // Инициализация объектов с медиа запросами
  if (media.length) {
    const breakpointsArray = [];
    media.forEach(item => {
      const params = item.dataset[dataSetValue];
      const breakpoint = {};
      const paramsArray = params.split(",");
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });
    // Получаем уникальные брейкпоинты
    let mdQueries = breakpointsArray.map(function (item) {
      return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
    });
    mdQueries = uniqArray(mdQueries);
    const mdQueriesArray = [];

    if (mdQueries.length) {
      // Работаем с каждым брейкпоинтом
      mdQueries.forEach(breakpoint => {
        const paramsArray = breakpoint.split(",");
        const mediaBreakpoint = paramsArray[1];
        const mediaType = paramsArray[2];
        const matchMedia = window.matchMedia(paramsArray[0]);
        // Объекты с нужными условиями
        const itemsArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        });
        mdQueriesArray.push({
          itemsArray,
          matchMedia
        })
      });
      return mdQueriesArray;
    }
  }
}
function bildSliders() {
  //BildSlider
  let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
  if (sliders) {
    sliders.forEach(slider => {
      slider.parentElement.classList.add('swiper');
      slider.classList.add('swiper-wrapper');
      for (const slide of slider.children) {
        slide.classList.add('swiper-slide');
      }
    });
  }
}
// Инициализация слайдеров
function initSliders() {
  // Добавление классов слайдера
  // при необходимости отключить
  bildSliders();
  // Перечень слайдеров
  if (document.querySelector('.certificate__slider')) {
    new Swiper('.certificate__slider', {
      // Подключаем модули слайдера
      // для конкретного случая
      // modules: [Navigation],
      /*
      effect: 'fade',
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      */
      observer: true,
      observeParents: true,
      slidesPerView: 3,
      spaceBetween: 0,
      // autoHeight: true,
      speed: 800,
      centeredSlides: true,
      initialSlide: 1,
      //touchRatio: 0,
      //simulateTouch: false,
      loop: true,
      //preloadImages: false,
      //lazy: true,
      // Dotts
      //pagination: {
      //	el: '.slider-quality__pagging',
      //	clickable: true,
      //},
      // Arrows
      navigation: {
        nextEl: '.swiper-arrow__next',
        prevEl: '.swiper-arrow__prew',
      },
      /*
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
          autoHeight: true,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1268: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
      */
      on: {

      }
    });
  }
  if (document.querySelector('.main__slider')) {
    new Swiper('.main__slider', {
      // Подключаем модули слайдера
      // для конкретного случая
      // modules: [Navigation, Pagination, Autoplay],
      // effect: 'fade',
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 20,
      // autoHeight: true,
      speed: 800,
      // initialSlide: 1,
      //touchRatio: 0,
      //simulateTouch: false,
      // loop: true,
      //preloadImages: false,
      //lazy: true,
      // Dotts
      pagination: {
        el: '.main__column-pagg',
        clickable: true,
      },
      // Arrows
      // navigation: {
      // 	nextEl: '.swiper-arrow__next',
      // 	prevEl: '.swiper-arrow__prew',
      // },
      /*
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
          autoHeight: true,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1268: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
      */
      on: {

      }
    });
  }
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
  // Добавление классов слайдера
  // при необходимости отключить
  bildSliders();

  let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
  if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
      const sliderScrollItem = sliderScrollItems[index];
      const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
      const sliderScroll = new Swiper(sliderScrollItem, {
        observer: true,
        observeParents: true,
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: {
          enabled: true,
        },
        scrollbar: {
          el: sliderScrollBar,
          draggable: true,
          snapOnRelease: false
        },
        mousewheel: {
          releaseOnEdges: true,
        },
      });
      sliderScroll.scrollbar.updateSize();
    }
  }
}

window.addEventListener("load", function (e) {
  // Запуск инициализации слайдеров
  initSliders();
  // Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
  //initSlidersScroll();
});
const lazyMedia = new LazyLoad({
  elements_selector: '[data-src],[data-srcset]',
  class_loaded: '_lazy-loaded',
  use_native: true
});

let searchPaste = document.querySelector('._search-paste')
if (searchPaste) {
  let val = searchPaste.querySelector('._example')
  let inp = searchPaste.querySelector('input')
  let list = searchPaste.querySelector('.search__list')
  let close = searchPaste.querySelector('._close')


  val.addEventListener("click", function (e) {
    inp.value = val.textContent
  });
  inp.addEventListener('input', function () {
    if (inp.value != '') {
      list.classList.add('_active')

    }
  })
  close.addEventListener('click', function () {
    list.classList.remove('_active')
  })
}




function rangeInit() {
  const rangeItems = document.querySelectorAll('[data-range]');
  if (rangeItems.length) {
    rangeItems.forEach(rangeItem => {
      const fromValue = rangeItem.querySelector('[data-range-from]');
      const toValue = rangeItem.querySelector('[data-range-to]');
      const item = rangeItem.querySelector('[data-range-item]');

      noUiSlider.create(item, {
        start: [Number(fromValue.value), Number(toValue.value)],
        connect: true,
        range: {
          'min': [Number(fromValue.dataset.rangeFrom)],
          'max': [Number(toValue.dataset.rangeTo)]
        },

        format: wNumb({
          decimals: 0, // default is 2
          // thousand: '.', // thousand delimiter
          // postfix: 'м', // gets appended after the number
          // prefix: 'от ',
        }),

        // format: {
        // 	from: function (value) {
        // 		return parseInt(value);
        // 	},
        // 	to: function (value) {
        // 		return parseInt(value);
        // 	}
        // }
      });

      item.noUiSlider.on('update', function (values, handle) {
        if (handle) {
          toValue.value = values[handle];
        } else {
          fromValue.value = values[handle];
        }
      });
    });
  }
}
rangeInit();



const cbox = document.querySelectorAll(".filter__column-spoller");
const cbox01 = document.querySelectorAll(".filter__column-list");

if (cbox) {
  for (let i = 0; i < cbox.length; i++) {
    let elemernt = cbox[i];
    let elemernt01 = cbox01[i];
    elemernt.addEventListener("change", selectDate);
    elemernt.addEventListener("click", () => {
      if (elemernt.classList.contains("active")) {
        $(elemernt01).slideUp(500)
      } else {
        $(elemernt01).slideDown(500)
      }
    })
  }
  function selectDate() {
    if (this.classList.contains('active')) {
      this.classList.remove('active');
    } else {
      this.classList.add('active');
    }
  }
}



const btn = document.querySelector(".item-filter__btn-c");
const btn01 = document.querySelector(".item-filter__btn-r");
const btn02 = document.querySelector(".filter__inner");


if (btn && btn01 && btn02) {
  btn.addEventListener("click", () => {
    btn02.classList.add("active")
    btn.classList.add("active")

    if (btn.classList.contains("active")) {
      $(btn02).slideUp(500)
    } else {
      $(btn02).slideDown(500)
      btn02.classList.remove("active")
    }
  })


  btn01.addEventListener("click", () => {
    btn02.classList.add("active")
    btn01.classList.add("active")

    if (btn01.classList.contains("active")) {
      $(btn02).slideDown(500)

    } else {
      $(btn02).slideUp(500)
    }
  })
}
let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty('height') : null;
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      !showmore ? target.style.removeProperty('overflow') : null;
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
      // Создаем событие 
      document.dispatchEvent(new CustomEvent("slideUpDone", {
        detail: {
          target: target
        }
      }));
    }, duration);
  }
}
let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty('height') : null;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
      // Создаем событие 
      document.dispatchEvent(new CustomEvent("slideDownDone", {
        detail: {
          target: target
        }
      }));
    }, duration);
  }
}
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
}
class SelectConstructor {
  constructor(props, data = null) {
    let defaultConfig = {
      init: true,
      logging: true,
    }
    this.config = Object.assign(defaultConfig, props);
    // CSS классы модуля
    this.selectClasses = {
      classSelect: "select", // Главный блок
      classSelectBody: "select__body", // Тело селекта
      classSelectTitle: "select__title", // Заголовок
      classSelectValue: "select__value", // Значение в заголовке
      classSelectLabel: "select__label", // Лабел
      classSelectInput: "select__input", // Поле ввода
      classSelectText: "select__text", // Оболочка текстовых данных
      classSelectLink: "select__link", // Ссылка в элементе
      classSelectOptions: "select__options", // Выпадающий список
      classSelectOptionsScroll: "select__scroll", // Оболочка при скролле
      classSelectOption: "select__option", // Пункт
      classSelectContent: "select__content", // Оболочка контента в заголовке
      classSelectRow: "select__row", // Ряд
      classSelectData: "select__asset", // Дополнительные данные
      classSelectDisabled: "_select-disabled", // Запрешен
      classSelectTag: "_select-tag", // Класс тега
      classSelectOpen: "_select-open", // Список открыт
      classSelectActive: "_select-active", // Список выбран
      classSelectFocus: "_select-focus", // Список в фокусе
      classSelectMultiple: "_select-multiple", // Мультивыбор
      classSelectCheckBox: "_select-checkbox", // Стиль чекбокса
      classSelectOptionSelected: "_select-selected", // Выбранный пункт
    }
    this._this = this;
    // Запуск инициализации
    if (this.config.init) {
      // Получение всех select на странице
      const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll('select');
      if (selectItems.length) {
        this.selectsInit(selectItems);
      } else {
      }
    }
  }
  // Конструктор CSS класса
  getSelectClass(className) {
    return `.${className}`;
  }
  // Геттер элементов псевдоселекта
  getSelectElement(selectItem, className) {
    return {
      originalSelect: selectItem.querySelector('select'),
      selectElement: selectItem.querySelector(this.getSelectClass(className)),
    }
  }
  // Функция инициализации всех селектов
  selectsInit(selectItems) {
    selectItems.forEach((originalSelect, index) => {
      this.selectInit(originalSelect, index + 1);
    });
    // Обработчики событий...
    // ...при клике
    document.addEventListener('click', function (e) {

      const selectActiveItems = document.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
      if (selectActiveItems.length) {
        selectActiveItems.forEach(selectActiveItem => {
          this.selectAction(selectActiveItem);
        });
      }
      this.selectsActions(e);
    }.bind(this));
    // ...при нажатии клавиши
    document.addEventListener('keydown', function (e) {
      this.selectsActions(e);
    }.bind(this));
    // ...при фокусе
    document.addEventListener('focusin', function (e) {
      this.selectsActions(e);
    }.bind(this));
    // ...при потере фокуса
    document.addEventListener('focusout', function (e) {
      this.selectsActions(e);
    }.bind(this));
  }
  // Функция инициализации конкретного селекта
  selectInit(originalSelect, index) {
    const _this = this;
    // Создаем оболочку
    let selectItem = document.createElement("div");
    selectItem.classList.add(this.selectClasses.classSelect);
    // Выводим оболочку перед оригинальным селектом
    originalSelect.parentNode.insertBefore(selectItem, originalSelect);
    // Помещаем оригинальный селект в оболочку
    selectItem.appendChild(originalSelect);
    // Скрываем оригинальный селект
    originalSelect.hidden = true;
    // Присваиваем уникальный ID
    index ? originalSelect.dataset.id = index : null;

    // Конструктор косновных элементов
    selectItem.insertAdjacentHTML('beforeend', `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions} " ></div></div>`);
    // Запускаем конструктор псевдоселекта
    this.selectBuild(originalSelect);

    // Работа с плейсхолдером
    if (this.getSelectPlaceholder(originalSelect)) {
      // Запоминаем плейсхолдер
      originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
      // Если включен режим label
      if (this.getSelectPlaceholder(originalSelect).label.show) {
        const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
        selectItemTitle.insertAdjacentHTML('afterbegin', `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
      }
    }
    // Запоминаем скорость
    originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : "150";
    // Событие при изменении оригинального select
    originalSelect.addEventListener('change', function (e) {
      _this.selectChange(e);
    });
  }
  // Конструктор псевдоселекта
  selectBuild(originalSelect) {
    const selectItem = originalSelect.parentElement;
    // Добавляем ID селекта
    selectItem.dataset.id = originalSelect.dataset.id;
    // Получаем класс оригинального селекта, создаем модификатор и добавляем его
    selectItem.classList.add(originalSelect.getAttribute('class') ? `select_${originalSelect.getAttribute('class')}` : "");
    // Если множественный выбор, добавляем класс
    originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
    // Cтилизация элементов под checkbox (только для multiple)
    originalSelect.hasAttribute('data-checkbox') && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
    // Сеттер значения заголовка селекта
    this.setSelectTitleValue(selectItem, originalSelect);
    // Сеттер элементов списка (options)
    this.setOptions(selectItem, originalSelect);
    // Если включена опция поиска data-search, запускаем обработчик
    originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;
    // Если указана настройка data-open, открываем селект
    originalSelect.hasAttribute('data-open') ? this.selectAction(selectItem) : null;
    // Обработчик disabled
    this.selectDisabled(selectItem, originalSelect);
  }
  // Функция реакций на события
  selectsActions(e) {
    const targetElement = e.target;
    const targetType = e.type;
    if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
      const selectItem = targetElement.closest('.select') ? targetElement.closest('.select') : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
      const originalSelect = this.getSelectElement(selectItem).originalSelect;
      if (targetType === 'click') {
        if (!originalSelect.disabled) {
          if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
            // Обработка клика на тег
            const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
            const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
            this.optionAction(selectItem, originalSelect, optionItem);
          } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) {
            // Обработка клика на заголовок селекта
            this.selectAction(selectItem);
          } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
            // Обработка клика на элемент селекта
            const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
            this.optionAction(selectItem, originalSelect, optionItem);
          }
        }
      } else if (targetType === 'focusin' || targetType === 'focusout') {
        if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) {
          targetType === 'focusin' ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
        }
      } else if (targetType === 'keydown' && e.code === 'Escape') {
        this.selectsСlose();
      }
    } else {
      this.selectsСlose();
    }
  }
  // Функция закрытия всех селектов
  selectsСlose() {
    const selectActiveItems = document.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
    if (selectActiveItems.length) {
      selectActiveItems.forEach(selectActiveItem => {
        this.selectAction(selectActiveItem);
      });
    }
  }
  // Функция открытия/закрытия конкретного селекта
  selectAction(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    if (!selectOptions.classList.contains('_slide')) {
      selectItem.classList.toggle(this.selectClasses.classSelectOpen);
      _slideToggle(selectOptions, originalSelect.dataset.speed);
    }
  }
  // Сеттер значения заголовка селекта
  setSelectTitleValue(selectItem, originalSelect) {
    const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
    const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
    if (selectItemTitle) selectItemTitle.remove();
    selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
  }
  // Конструктор значения заголовка
  getSelectTitleValue(selectItem, originalSelect) {
    // Получаем выбранные текстовые значения
    let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
    // Обработка значений мультивыбора
    // Если включен режим тегов (указана настройка data-tags)
    if (originalSelect.multiple && originalSelect.hasAttribute('data-tags')) {
      selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map(option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`).join('');
      // Если вывод тегов во внешний блок
      if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
        document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
        if (originalSelect.hasAttribute('data-search')) selectTitleValue = false;
      }
    }
    // Значение(я) или плейсхолдер
    selectTitleValue = selectTitleValue.length ? selectTitleValue : originalSelect.dataset.placeholder;
    // Если есть значение, добавляем класс
    this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
    // Возвращаем поле ввода для поиска или текст
    if (originalSelect.hasAttribute('data-search')) {
      // Выводим поле ввода для поиска

      return `<div class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`;
    } else {
      // Если выбран элемент со своим классом
      const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : '';
      // Выводим текстовое значение
      return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
    }
  }
  // Конструктор данных для значения заголовка
  getSelectElementContent(selectOption) {
    // Если для элемента указан вывод картинки или текста, перестраиваем конструкцию
    const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : '';
    const selectOptionDataHTML = selectOptionData.indexOf('img') >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
    let selectOptionContentHTML = ``;
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : '';
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : '';
    selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : '';
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : '';
    selectOptionContentHTML += selectOption.textContent;
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    return selectOptionContentHTML;
  }
  // Получение данных плейсхолдера
  getSelectPlaceholder(originalSelect) {
    const selectPlaceholder = Array.from(originalSelect.options).find(option => !option.value);
    if (selectPlaceholder) {
      return {
        value: selectPlaceholder.textContent,
        show: selectPlaceholder.hasAttribute("data-show"),
        label: {
          show: selectPlaceholder.hasAttribute("data-label"),
          text: selectPlaceholder.dataset.label
        }
      }
    }
  }
  // Получение данных из выбранных элементов
  getSelectedOptionsData(originalSelect, type) {
    // Получаем все выбранные объекты из select
    let selectedOptions = [];
    if (originalSelect.multiple) {
      // Если мультивыбор
      // Убираем плейсхолдер, получаем остальные выбранные элементы
      selectedOptions = Array.from(originalSelect.options).filter(option => option.value).filter(option => option.selected);
    } else {
      // Если единичный выбор
      selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
    }
    return {
      elements: selectedOptions.map(option => option),
      values: selectedOptions.filter(option => option.value).map(option => option.value),
      html: selectedOptions.map(option => this.getSelectElementContent(option))
    }
  }
  // Конструктор элементов списка
  getOptions(originalSelect) {
    // Настрока скролла элементов
    let selectOptionsScroll = originalSelect.hasAttribute('data-scroll') ? `data-simplebar` : '';
    let selectOptionsScrollHeight = originalSelect.dataset.scroll ? `style="max-height:${originalSelect.dataset.scroll}px"` : '';
    // Получаем элементы списка
    let selectOptions = Array.from(originalSelect.options);
    if (selectOptions.length > 0) {
      let selectOptionsHTML = ``;
      // Если указана настройка data-show, показываем плейсхолдер в списке
      if ((this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show) || originalSelect.multiple) {
        selectOptions = selectOptions.filter(option => option.value);
      }
      // Строим и выводим основную конструкцию
      selectOptionsHTML += selectOptionsScroll ? `<div ${selectOptionsScroll} ${selectOptionsScrollHeight} class="${this.selectClasses.classSelectOptionsScroll}">` : '';
      selectOptions.forEach(selectOption => {
        // Получаем конструкцию конкретного элемента списка
        selectOptionsHTML += this.getOption(selectOption, originalSelect);
      });
      selectOptionsHTML += selectOptionsScroll ? `</div>` : '';
      return selectOptionsHTML;
    }
  }
  // Конструктор конкретного элемента списка
  getOption(selectOption, originalSelect) {
    // Если элемент выбран и включен режим мультивыбора, добавляем класс
    const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : '';
    // Если элемент выбрани нет настройки data-show-selected, скрываем элемент
    const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute('data-show-selected') ? `hidden` : ``;
    // Если для элемента указан класс добавляем
    const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : '';
    // Если указан режим ссылки
    const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
    const selectOptionLinkTarget = selectOption.hasAttribute('data-href-blank') ? `target="_blank"` : '';
    // Строим и возвращаем конструкцию элемента
    let selectOptionHTML = ``;
    selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
    selectOptionHTML += this.getSelectElementContent(selectOption);
    selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
    return selectOptionHTML;
  }
  // Сеттер элементов списка (options)
  setOptions(selectItem, originalSelect) {
    // Получаем объект тела псевдоселекта
    const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    // Запускаем конструктор элементов списка (options) и добавляем в тело псевдоселекта
    selectItemOptions.innerHTML = this.getOptions(originalSelect);
  }
  // Обработчик клика на элемент списка
  optionAction(selectItem, originalSelect, optionItem) {
    if (originalSelect.multiple) { // Если мультивыбор
      // Выделяем классом элемент
      optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
      // Очищаем выбранные элементы 
      const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
      originalSelectSelectedItems.forEach(originalSelectSelectedItem => {
        originalSelectSelectedItem.removeAttribute('selected');
      });
      // Выбираем элементы 
      const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
      selectSelectedItems.forEach(selectSelectedItems => {
        originalSelect.querySelector(`option[value="${selectSelectedItems.dataset.value}"]`).setAttribute('selected', 'selected');
      });
    } else { // Если единичный выбор
      // Если не указана настройка data-show-selected, скрываем выбранный элемент
      if (!originalSelect.hasAttribute('data-show-selected')) {
        // Сначала все показать
        if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) {
          selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
        }
        // Скрываем выбранную
        optionItem.hidden = true;
      }
      originalSelect.value = optionItem.hasAttribute('data-value') ? optionItem.dataset.value : optionItem.textContent;
      this.selectAction(selectItem);
    }
    // Обновляем заголовок селекта
    this.setSelectTitleValue(selectItem, originalSelect);
    // Вызываем реакцию на изменение селекта
    this.setSelectChange(originalSelect);
  }
  // Реакция на измененение оригинального select
  selectChange(e) {
    const originalSelect = e.target;
    this.selectBuild(originalSelect);
    this.setSelectChange(originalSelect);
  }
  // Обработчик изменения в селекте
  setSelectChange(originalSelect) {
    // Моментальная валидация селекта
    if (originalSelect.hasAttribute('data-validate')) {
      formValidate.validateInput(originalSelect);
    }
    // При изменении селекта отправляем форму
    if (originalSelect.hasAttribute('data-submit') && originalSelect.value) {
      let tempButton = document.createElement("button");
      tempButton.type = "submit";
      originalSelect.closest('form').append(tempButton);
      tempButton.click();
      tempButton.remove();
    }
    const selectItem = originalSelect.parentElement;
    // Вызов коллбэк функции
    this.selectCallback(selectItem, originalSelect);
  }
  // Обработчик disabled
  selectDisabled(selectItem, originalSelect) {
    if (originalSelect.disabled) {
      selectItem.classList.add(this.selectClasses.classSelectDisabled);
      this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
    } else {
      selectItem.classList.remove(this.selectClasses.classSelectDisabled);
      this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
    }
  }
  // Обработчик поиска по элементам списка
  searchActions(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption}`);
    const _this = this;
    selectInput.addEventListener("input", function () {
      selectOptionsItems.forEach(selectOptionsItem => {
        if (selectOptionsItem.textContent.toUpperCase().indexOf(selectInput.value.toUpperCase()) >= 0) {
          selectOptionsItem.hidden = false;
        } else {
          selectOptionsItem.hidden = true;
        }
      });
      // Если список закрыт открываем
      selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
    });
  }
  // Коллбэк функция
  selectCallback(selectItem, originalSelect) {
    document.dispatchEvent(new CustomEvent("selectCallback", {
      detail: {
        select: originalSelect
      }
    }));
  }
  // Логгинг в консоль
  setLogging(message) {
    this.config.logging ? FLS(`[select]: ${message}`) : null;
  }
}
// Запускаем и добавляем в объект модулей
flsModules.select = new SelectConstructor({});
function tabs() {
  const tabs = document.querySelectorAll('[data-tabs]');
  let tabsActiveHash = [];
  if (tabs.length > 0) {
    const hash = getHash();
    if (hash && hash.startsWith('tab-')) {
      tabsActiveHash = hash.replace('tab-', '').split('-');
    }
    tabs.forEach((tabsBlock, index) => {
      tabsBlock.classList.add('_tab-init');
      tabsBlock.setAttribute('data-tabs-index', index);
      tabsBlock.addEventListener("click", setTabsAction);
      initTabs(tabsBlock);
    });

    // Получение слойлеров с медиа запросами
    let mdQueriesArray = dataMediaQueries(tabs, "tabs");
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach(mdQueriesItem => {
        // Событие
        mdQueriesItem.matchMedia.addEventListener("change", function () {
          setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }
  // Установка позиций заголовков
  function setTitlePosition(tabsMediaArray, matchMedia) {
    tabsMediaArray.forEach(tabsMediaItem => {
      tabsMediaItem = tabsMediaItem.item;
      let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
      let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
      let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
      let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
      tabsTitleItems = Array.from(tabsTitleItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
      tabsContentItems = Array.from(tabsContentItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
      tabsContentItems.forEach((tabsContentItem, index) => {
        if (matchMedia.matches) {
          tabsContent.append(tabsTitleItems[index]);
          tabsContent.append(tabsContentItem);
          tabsMediaItem.classList.add('_tab-spoller');
        } else {
          tabsTitles.append(tabsTitleItems[index]);
          tabsMediaItem.classList.remove('_tab-spoller');
        }
      });
    });
  }
  // Работа с контентом
  function initTabs(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
      tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null;
    }
    if (tabsContent.length) {
      tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
      tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
      tabsContent.forEach((tabsContentItem, index) => {
        tabsTitles[index].setAttribute('data-tabs-title', '');
        tabsContentItem.setAttribute('data-tabs-item', '');

        if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
          tabsTitles[index].classList.add('_tab-active');
        }
        tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
      });
    }
  }
  function setTabsStatus(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    function isTabsAnamate(tabsBlock) {
      if (tabsBlock.hasAttribute('data-tabs-animate')) {
        return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
      }
    }
    const tabsBlockAnimate = isTabsAnamate(tabsBlock);
    if (tabsContent.length > 0) {
      const isHash = tabsBlock.hasAttribute('data-tabs-hash');
      tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
      tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index].classList.contains('_tab-active')) {
          if (tabsBlockAnimate) {
            _slideDown(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = false;
          }
          if (isHash && !tabsContentItem.closest('.popup')) {
            setHash(`tab-${tabsBlockIndex}-${index}`);
          }
        } else {
          if (tabsBlockAnimate) {
            _slideUp(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = true;
          }
        }
      });
    }
  }
  function setTabsAction(e) {
    const el = e.target;
    if (el.closest('[data-tabs-title]')) {
      const tabTitle = el.closest('[data-tabs-title]');
      const tabsBlock = tabTitle.closest('[data-tabs]');
      if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelector('._slide')) {
        let tabActiveTitle = tabsBlock.querySelectorAll('[data-tabs-title]._tab-active');
        tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter(item => item.closest('[data-tabs]') === tabsBlock) : null;
        tabActiveTitle.length ? tabActiveTitle[0].classList.remove('_tab-active') : null;
        tabTitle.classList.add('_tab-active');
        setTabsStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
}
tabs()
let sels = document.querySelectorAll('.select');
if (sels) {
  let selOps = document.querySelectorAll('.select__options')
  for (let index = 0; index < sels.length; index++) {
    const element = sels[index];
    element.addEventListener("click", function (e) {
      if (element.classList.contains('_select-open')) {
        for (let index = 0; index < selOps.length; index++) {
          const element1 = selOps[index];
          _slideToggle = (target = element1, duration = 500) => {
            if (target.hidden) {
              _slideDown(target, duration);
            } else {
              _slideUp(target, duration);
            }
          }
        }
        console.log('1111');
      } else {

        console.log('2222');
      }
    });

  }
}
// _slideToggle(spollerTitle.nextElementSibling, 500);

function createHoverImage() {
  document.querySelectorAll('[data-hover-src]').forEach((img) => {
    const src = img.getAttribute('src');
    const srcH = img.getAttribute('data-hover-src');

    img.addEventListener('mouseover', () => {img.src = srcH;})
    img.addEventListener('mouseout', () => {img.src = src;})
  });
}

createHoverImage();