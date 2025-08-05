// marketo-script.js
(function () {
  "use strict";

  var MARKETO_BASE_URL = "https://app-ab39.marketo.com";
  var MUNCHKIN_ID = "577-RQV-784";
  var FORM_ID = 1360;

  /**
   * Dynamically load the Marketo Forms2 library
   */
  function loadMarketoLibrary(callback) {
    if (window.MktoForms2) {
      console.log("✅ Marketo Forms2 already loaded");
      callback();
      return;
    }

    var script = document.createElement("script");
    script.src = MARKETO_BASE_URL + "/js/forms2/js/forms2.min.js";
    script.async = true;
    script.onload = function () {
      console.log("✅ Marketo library loaded");
      callback();
    };
    script.onerror = function () {
      console.error("❌ Failed to load Marketo library");
    };

    document.head.appendChild(script);
  }

  /**
   * Load the Marketo form into the placeholder div
   */
  function loadMarketoForm(callback) {
    if (!window.MktoForms2) {
      console.error("❌ MktoForms2 is not available");
      return;
    }

    MktoForms2.loadForm(MARKETO_BASE_URL, MUNCHKIN_ID, FORM_ID, function (form) {
      console.log("✅ Marketo form loaded");

      // Optional: Hook into form events
      form.onSuccess(function (vals, thankYouURL) {
        console.log("🎉 Form submitted successfully");
        return true; // Continue default thank-you handling
      });

      if (typeof callback === "function") {
        callback();
      }
    });
  }

  /**
   * Load LinkedIn Autofill and move it into the checkbox list
   */
  function loadLinkedInAutofill() {
    console.log("ℹ️ Loading LinkedIn Autofill...");

    // Create the LinkedIn autofill container
    var autofillDiv = document.createElement("div");
    autofillDiv.id = "autofill";
    autofillDiv.style.textAlign = "left";
    autofillDiv.style.margin = "0 0 10px 0";

    // LinkedIn Autofill script
    var liScript = document.createElement("script");
    liScript.src = "/assets/rbccm/js/sub/linkedin/autofill.min.js";
    liScript.async = true;
    liScript.onload = function () {
      console.log("✅ LinkedIn Autofill script loaded");
    };
    liScript.onerror = function () {
      console.warn("⚠️ LinkedIn Autofill script failed to load");
    };
    autofillDiv.appendChild(liScript);

    // LinkedIn Form binding script
    var liFormBind = document.createElement("script");
    liFormBind.type = "IN/Form2";
    liFormBind.setAttribute("data-form", "mktoForm_1205");
    liFormBind.setAttribute("data-field-firstname", "FirstName");
    liFormBind.setAttribute("data-field-lastname", "LastName");
    liFormBind.setAttribute("data-field-email", "Email");
    liFormBind.setAttribute("data-field-company", "Company");
    liFormBind.setAttribute("data-field-title", "Title");
    autofillDiv.appendChild(liFormBind);

    // Append temporarily to body (will be moved once form is ready)
    document.body.appendChild(autofillDiv);

    // After Marketo form renders, move autofill into the checkbox list
    if (window.MktoForms2 && window.jQuery) {
      MktoForms2.whenReady(function () {
        if ($("#autofill").length && $(".mktoCheckboxList").length) {
          $("#autofill").detach().prependTo(".mktoCheckboxList");
          console.log("✅ LinkedIn Autofill moved into .mktoCheckboxList");
        } else {
          console.warn("⚠️ Could not find autofill or .mktoCheckboxList");
        }
      });
    } else {
      console.warn("⚠️ MktoForms2 or jQuery not available for autofill positioning");
    }
  }

  /**
   * Initialize after DOM is ready
   */
  document.addEventListener("DOMContentLoaded", function () {
    var formPlaceholder = document.getElementById("mktoForm_" + FORM_ID);
    if (!formPlaceholder) {
      console.error("❌ Marketo form placeholder #mktoForm_" + FORM_ID + " not found");
      return;
    }

    console.log("ℹ️ Initializing Marketo form + LinkedIn Autofill");

    loadMarketoLibrary(function () {
      loadMarketoForm(function () {
        loadLinkedInAutofill();
      });
    });
  });
})();