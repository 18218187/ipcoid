function checkAltId(altTourId) {
  var domain = new RegExp(/spec1a1/);
  //This substitutes the tourID into <track> for the tours.spec1a1.com version of this tour
  //Add <script defer>checkAltId('<alt-tourID-number>')</script> underneath the <track> element for each tour
  if (window.location.host.match(domain)) {
    console.log(document.querySelectorAll("track"), altTourId);
    document.querySelectorAll("track").forEach(function (i) {
      i.setAttribute("tour", altTourId);
    });
  } else {
    return;
  }
}

const isSubscribedToIzooto = !!localStorage.getItem("izootoUID");

if (isSubscribedToIzooto) {
  console.log("Izooto subscription detected");
  goIzooto();
} else {
  console.log("No Izooto subscription detected");
}

function goIzooto() {
  loadIzootoScript();
  function initIzootoDoubleOptIn() {
    //initializes iZooto Push to trigger on <htmlElement>.izooto
    const _izq_style = {
      container: `
        position: fixed;
        ${window.innerWidth > 650 ? "top: 0" : "bottom: 0"};
        width: 100%;
        transition: top .3s ease;
      `,
      container_offset: `
        ${window.innerWidth > 650 ? "top: -500px" : "bottom: -500px"};
      `,
      inner_container: `
        width: 95%;
        max-width: 320px;
        margin: 0 auto;
        box-shadow: 0 3px 15px #0003;
        display: grid;
        grid-template-columns: calc(100% - 32px);
        grid-row-gap: 8px;
        justify-content: center;
        align-items: center;
        margin-bottom: 18px;
        border-radius: 4px;
        background: white;
        margin-top: 20px
      `,
      text: `
        margin-top: 16px;
        color: #555;
        font-size: 16px
      `,
      paragraph: `
        margin-top: 0;
        color: #555;
        font-size: 13px;
        color: #999
      `,
      button_row: `
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-bottom: 16px;
      `,
      button: `
        width: max-content;
        min-width: 70px;
        padding: 0 6px;
        height: 34px;
        border-radius: 2px;
        color: #4285F4;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 13px;
        user-select: none;
        letter-spacing: 1.3px;
      `,
      deny: `
        font-size: 11px;
      `,
      allow: `
        background: #4285F4;
        color: white;
        box-shadow: 0 3px 8px #0004;
      `,
    };
    const prompt_html = `
      <div class="izooto-inner-container" style="${_izq_style.inner_container}">
        <div class="izooto-text" style="${
          _izq_style.text
        }">Don’t miss out on Hot Chicks!</div>
        <div class="izooto-text" style="${
          _izq_style.paragraph
        }">Click to allow when prompted.</div>
        <div class="izooto-button-row" style="${_izq_style.button_row}">
          <div class="izooto-button izooto-deny" style="${
            _izq_style.button + _izq_style.deny
          }">Later</div>
          <div class="izooto-button izooto-allow" style="${
            _izq_style.button + _izq_style.allow
          }">Let’s Go!</div>
        </div>
      </div>
    `;

    let prompt_container = document.createElement("div");
    prompt_container.classList.add("izooto_double_prompt");
    prompt_container.style = _izq_style.container + _izq_style.container_offset;
    prompt_container.innerHTML = prompt_html;

    document.body.appendChild(prompt_container);

    const urlParams = new URLSearchParams(window.location.search);
    const sid = urlParams.get("sid");

    if (sid == "internal_testing") {
      window._izq.push(["userProfile", { add: { debug: "yes" } }]);
    }

    function showModal() {
      prompt_container.style = _izq_style.container;
      document.body.classList.add("modal-active");
    }
    function hideModal() {
      prompt_container.style = "display: none";
      document
        .querySelector(".izooto_double")
        .removeEventListener("click", showModal);
      document.body.classList.remove("modal-active");
    }
    function triggerIzooto() {
      window._izq = window._izq || [];
      window._izq.push(["triggerPrompt"]);
      hideModal();
    }
    document
      .querySelector(".izooto_double")
      .addEventListener("click", showModal);
    document.querySelector(".izooto-deny").addEventListener("click", hideModal);
    document
      .querySelector(".izooto-allow")
      .addEventListener("click", triggerIzooto);
  }

  function initIzooto() {
    const urlParams = new URLSearchParams(window.location.search);
    const sid = urlParams.get("sid");

    if (sid == "internal_testing") {
      window._izq.push(["userProfile", { add: { debug: "yes" } }]);
    }
    document.querySelector(".izooto").addEventListener("click", function () {
      window._izq = window._izq || [];
      window._izq.push(["triggerPrompt"]);
    });
  }

  window.addEventListener("DOMContentLoaded", function () {
    if (Notification.permission !== "denied") {
      if (document.querySelector(".izooto")) {
        initIzooto();
      } else if (document.querySelector(".izooto_double")) {
        console.log("DOUBLE OPT IN");
        initIzootoDoubleOptIn();
      }
    }
  });
}

function loadIzootoScript() {
  //determines the correct iZooto script to use depending on domain
  window._izq = window._izq || [];
  window._izq.push(["init", { auto_prompt: false }]);
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.innerHTML = null;
  var id =
    window.location.hostname.split("").filter((i) => Number(i)).length == 1
      ? "6d0d9819e611e28a165c1c894e7998790112eec4"
      : "af5ded0201d1b872939d06c6a6d9edf41c428b14";
  s.src = "https://cdn.izooto.com/scripts/" + id + ".js";
  document.head.appendChild(s);
}

(function nullFunnel() {
  window.addEventListener("DOMContentLoaded", function () {
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `
		#rstr{cursor:none;text-decoration:none;color:transparent!important;position:absolute;bottom:10px;left:10px;width:2px;height:2px;z-index:99; -webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}
		`;
    document.head.appendChild(style);

    var anchor = document.createElement("a");
    var re = window.location.hostname.split(".");
    var len = re.length;
    var uri = window.location.protocol + "//" + re[len - 2] + "." + re[len - 1];
    var q = window.location.search
      ? uri + "/?" + window.location.search.replace("?", "")
      : uri;
    anchor.href =
      "https://harlotthespy.awesome-apps.io/go?" +
      window.location.search.replace("?", "") +
      "&re=" +
      encodeURIComponent(q);
    anchor.id = "rstr";
    document.body.prepend(anchor);
  });
})();
