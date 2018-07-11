$(function() {
  // переход с кнопок

  $('.js-button').click(function() {
    var scrollToElement = $(this).attr('data-href');
    $('html,body').animate(
      { scrollTop: $(scrollToElement).offset().top + 'px' },
      { duration: 1e3 }
    );
  });

  // загрузка видео с ютуба
  $('.video__inner').click(function() {
    $(this).append(
      '<iframe width="642" height="401" src="https://www.youtube.com/embed/yrXRTCMGkZw?enablejsapi=1&amp;autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="display:none"></iframe>'
    );
    $('.video__inner iframe').fadeIn(500, function() {
      $('.video__overlay').fadeOut();
    });
  });

  // складывание блоков аккордеона

  $('.question__item').click(function() {
    $(this).toggleClass('open');
  });

  // открытие формы
  $('.button__modal').click(function() {
    var source = $(this).attr('data-source');

    $('.js-source-input').val(source);

    $('.modal')
      .addClass('active')
      .hide()
      .fadeIn(300);
  });

  // закрытие формы
  $('.modal__close').click(function() {
    $('.modal').fadeOut(300, function() {
      $('.modal').removeClass('active');
    });
  });

  $(document).mouseup(function(e) {
    // событие клика по веб-документу
    var div = $('.modal__wrapper'); // тут указываем элемента
    if (
      !div.is(e.target) &&
      div.has(e.target).length === 0 &&
      div.is(':visible')
    ) {
      // и не по его дочерним элементам
      $('.modal').fadeOut(300, function() {
        $('.modal').removeClass('active');
      });
    }
  });

  // типа отправка формы
  $('.form').submit(function(event) {
    event.preventDefault();

    var $form = $(this),
      $source = $form.find('.js-source-input').val(),
      $name = $form.find('.js-name-input').val(),
      $phone = $form.find('.js-phone-input').val(),
      $email = $form.find('.js-email-input').val(),
      $agreement = $form.find('#isAgree').is(':checked');

    if (!validateEmail($email)) {
      $('.form__item').addClass('ok');

      $form
        .find('.js-email-input')
        .parent()
        .removeClass('ok')
        .addClass('error');
      return;
    } else {
      $('.form__item')
        .removeClass('ok')
        .removeClass('error');

      alert(
        'Форма как-бы должна куда-то перейти для оплаты, как написано в ТЗ, источник - ' +
          $source +
          ', ФИО - ' +
          $name +
          ', телефон - ' +
          $phone +
          ', e-mail - ' +
          $email +
          ' Согласие на обработку персональных данных - ' +
          $agreement +
          '. Всё!'
      );
    }
  });

  // маска телефона в форме

  $('.js-phone-input').mask('+7 (999) 999-99-99');

  // валидация email
  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
});
