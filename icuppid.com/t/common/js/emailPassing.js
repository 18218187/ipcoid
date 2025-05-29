const epString = window.location.search;
const epParams = new URLSearchParams(epString);
const emailParam = epParams.get("email");
let decoded;
let base64regex =
  /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
let email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

if (emailParam && base64regex.test(emailParam) && isNaN(emailParam)) {
  decoded = decodeURIComponent(atob(emailParam));
} else if (emailParam && email_regex.test(emailParam)) {
  decoded = emailParam;
}

if (decoded) {
  $('[name="email"]').val(decoded).focus();

  $(document).ready(function () {
    angular.element($("body")).scope().email = decoded;
    $('[data-placeholder="email"]').addClass("step__field__placeholder_active");
  });
}
