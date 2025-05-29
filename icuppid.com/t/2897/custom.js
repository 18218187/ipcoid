var timeouts = [],
  did_show_results = false;

let $window = $(window);

function init() {
  $("[ng-model]").on("keydown", function () {
    var $this = $(this);

    if ($this.val().length > 0) {
      $this.removeClass("step__field__input_error");

      $('[data-error="' + $this.attr("ng-model") + '"]')
        .html("")
        .hide();
      $('[data-valid="' + $this.attr("ng-model") + '"]').fadeIn(200);
      $('[data-placeholder="' + $this.attr("ng-model") + '"]').removeClass(
        "step__field__placeholder_error"
      );
    } else {
      $('[data-valid="' + $this.attr("ng-model") + '"]').fadeOut(200);
    }
  });

  $("[ng-model]").on("focus", function () {
    var $this = $(this);

    $('[data-placeholder="' + $this.attr("ng-model") + '"]').addClass(
      "step__field__placeholder_active"
    );
  });

  $("[ng-model]").on("blur", function () {
    var $this = $(this);

    if ($this.val().length === 0)
      $('[data-placeholder="' + $this.attr("ng-model") + '"]').removeClass(
        "step__field__placeholder_active"
      );
  });

  // Captcha
  $(".captcha__item").on("click", function () {
    var $this = $(this),
      isGirl = parseInt($this.data("check")) === 1 ? true : false;

    if (isGirl) {
      if (!$this.hasClass("is--active")) {
        $this.addClass("is--active");
      } else {
        $this.removeClass("is--active");
      }
    }
  });

  // Show btn
  $(".step__field__show").on("click", function () {
    var $this = $(this),
      inputField = $(".step__field--password").find(".step__field__input");

    if (!$this.hasClass("is--active")) {
      $this.addClass("is--active");
      inputField.attr("type", "text");
    } else {
      $this.removeClass("is--active");
      inputField.attr("type", "password");
    }
  });
}

function animateStep(old_step, new_step) {
  var $old_step = $("[data-step=" + old_step + "]");
  $new_step = $("[data-step=" + new_step + "]");

  if (did_show_results) resetResults();

  if (
    old_step != new_step &&
    old_step <= angular.element("[ng-controller]").scope().mst.num_steps
  ) {
    $old_step.css({
      "-webkit-transform": "translateX(-100%)",
      transform: "translateX(-100%)",
    });
    $new_step.show();
    setTimeout(function () {
      $new_step.css({
        "-webkit-transform": "translateX(0)",
        transform: "translateX(0)",
      });
    }, 10);
  } else {
    $new_step.show().css({
      "-webkit-transform": "translateX(0)",
      transform: "translateX(0)",
    });
  }

  $(window).scrollTop($("[data-form]").offset().top);
}

function showResults(sending_to_wh) {
  if (!sending_to_wh) return;

  did_show_results = true;

  document.activeElement.blur();
  $("body").css("position", "static");
  $('button, input[type="submit"]').prop("disabled", true);

  $("[data-step]").fadeOut(400, function () {
    $("[data-results]").fadeIn(400, function () {
      timeouts.push(
        setTimeout(function () {
          $('[data-checks] [data-check="0"]').fadeOut(200, function () {
            $('[data-check="1"]').fadeIn(200);
          });
        }, 1250)
      );
      timeouts.push(
        setTimeout(function () {
          $('[data-checks] [data-check="1"]').fadeOut(200, function () {
            $('[data-check="2"]').fadeIn(200);
          });
        }, 2500)
      );
      timeouts.push(
        setTimeout(function () {
          $('[data-checks] [data-check="2"]').fadeOut(200, function () {
            $('[data-check="3"]').fadeIn(200);
            $("[data-spinner]").fadeOut(400);
            $("[data-finish]").fadeIn(400);
          });
        }, 3750)
      );
    });
  });
}

function resetResults() {
  did_show_results = false;

  for (var i = 0; i < timeouts.length; i++) clearTimeout(timeouts[i]);

  $("[data-results]").fadeOut(400);
}

function handleErrors(errors) {
  $("[data-error]").html("").hide();
  $("[ng-model]").removeClass("step__field__input_error");

  angular.forEach(errors, function (error_obj) {
    switch (error_obj.field) {
      case "age":
      case "username":
      case "email":
      case "password":
        $('[data-error="' + error_obj.field + '"]')
          .html(error_obj.error)
          .show();
        $('[data-valid="' + error_obj.field + '"]').fadeOut(200);
        $('[data-placeholder="' + error_obj.field + '"]').addClass(
          "step__field__placeholder_error"
        );
        $('[ng-model="' + error_obj.field + '"]').addClass(
          "step__field__input_error"
        );
        break;

      default:
        break;
    }
  });

  $('button, input[type="submit"]').removeAttr("disabled");
}

function handleSuccess(loaderResults) {
  showResults();
  $("[data-upgradebtn]").fadeIn(400);
}

function loaderResults(is_sending) {
  console.log(is_sending);
  var el = $("#lastStepBtn");

  if (!is_sending) {
    el.fadeIn();
  } else {
    el.fadeOut();
  }
}

function handleSuccess(wh_success) {
  setTimeout(function () {
    window.location.href = wh_success.wh_login + wh_success.redirect;
  }, 1000);
}

$(document).ready(function () {
  init();
  $(".errorAge").click(function () {
    $(".error").show().text("You must be 18 OR OLDER to enter.");
  });
});

$(".upgrade__button").click(function (e) {
  e.preventDefault();
  angular.element('[ng-controller="utlCtl"]').scope().handleUpgradeHit("trial");
});
