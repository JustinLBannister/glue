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
  function loadMarketoForm() {
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
    });
  }

  /**
   * Optional LinkedIn Autofill support
   */
  function loadLinkedInAutofill() {
    try {
      var autofillDiv = document.getElementById("autofill");
      if (!autofillDiv) {
        console.log("ℹ️ LinkedIn autofill placeholder not found — skipping");
        return;
      }

      var script = document.createElement("script");
      script.src = "/assets/rbccm/js/sub/linkedin/autofill.min.js";
      script.async = true;
      script.onload = function () {
        console.log("✅ LinkedIn autofill loaded");
      };
      script.onerror = function () {
        console.warn("⚠️ LinkedIn autofill failed to load — continuing without it");
      };
      document.body.appendChild(script);
    } catch (err) {
      console.warn("⚠️ LinkedIn autofill error:", err);
    }
  }

  /**
   * Initialize after DOM is ready
   */
  document.addEventListener("DOMContentLoaded", function () {
    var formPlaceholder = document.getElementById("mktoForm_1360");
    if (!formPlaceholder) {
      console.error("❌ Marketo form placeholder #mktoForm_1360 not found");
      return;
    }

    console.log("ℹ️ Initializing Marketo form");
    loadMarketoLibrary(function () {
      loadMarketoForm();
      loadLinkedInAutofill(); // Optional
    });
  });
})();