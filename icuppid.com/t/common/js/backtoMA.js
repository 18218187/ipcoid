function getProductFromUrlOrDefault(url) {
  var link = document.createElement("a");
  link.setAttribute("href", url);

  var product = url.split(".").shift();
  return product;
}

function handleBackToMA(wh_success) {
  const date = new Date();
  var product = getProductFromUrlOrDefault(wh_success.wh_login);

  date.setTime(date.getTime() + 10 * 60 * 1000);
  document.cookie = "visited=" + product + "; expires=" + date.toUTCString();
}

function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function forwardToMemberArea() {
  const visited = getCookie("visited");

  if (!visited) {
    return;
  }

  document.cookie = "visited = ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = visited + ".com/";
}

forwardToMemberArea();

window.addEventListener("pageshow", function (event) {
  var historyTraversal = event.persisted,
    perf = window.performance,
    perfEntries =
      perf && perf.getEntriesByType && perf.getEntriesByType("navigation"),
    perfEntryType = perfEntries && perfEntries[0] && perfEntries[0].type,
    navigationType = perf && perf.navigation && perf.navigation.type;
  if (
    historyTraversal ||
    perfEntryType === "back_forward" ||
    navigationType === 2
  ) {
    window.location.reload();
  }
});
