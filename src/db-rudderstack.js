(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*! js-cookie v3.0.1 | MIT */
;
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, (function () {
    var current = global.Cookies;
    var exports = global.Cookies = factory();
    exports.noConflict = function () { global.Cookies = current; return exports; };
  }()));
}(this, (function () { 'use strict';

  /* eslint-disable no-var */
  function assign (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target
  }
  /* eslint-enable no-var */

  /* eslint-disable no-var */
  var defaultConverter = {
    read: function (value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
    },
    write: function (value) {
      return encodeURIComponent(value).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      )
    }
  };
  /* eslint-enable no-var */

  /* eslint-disable no-var */

  function init (converter, defaultAttributes) {
    function set (key, value, attributes) {
      if (typeof document === 'undefined') {
        return
      }

      attributes = assign({}, defaultAttributes, attributes);

      if (typeof attributes.expires === 'number') {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }

      key = encodeURIComponent(key)
        .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
        .replace(/[()]/g, escape);

      var stringifiedAttributes = '';
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue
        }

        stringifiedAttributes += '; ' + attributeName;

        if (attributes[attributeName] === true) {
          continue
        }

        // Considers RFC 6265 section 5.2:
        // ...
        // 3.  If the remaining unparsed-attributes contains a %x3B (";")
        //     character:
        // Consume the characters of the unparsed-attributes up to,
        // not including, the first %x3B (";") character.
        // ...
        stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
      }

      return (document.cookie =
        key + '=' + converter.write(value, key) + stringifiedAttributes)
    }

    function get (key) {
      if (typeof document === 'undefined' || (arguments.length && !key)) {
        return
      }

      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all.
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var jar = {};
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var value = parts.slice(1).join('=');

        try {
          var foundKey = decodeURIComponent(parts[0]);
          jar[foundKey] = converter.read(value, foundKey);

          if (key === foundKey) {
            break
          }
        } catch (e) {}
      }

      return key ? jar[key] : jar
    }

    return Object.create(
      {
        set: set,
        get: get,
        remove: function (key, attributes) {
          set(
            key,
            '',
            assign({}, attributes, {
              expires: -1
            })
          );
        },
        withAttributes: function (attributes) {
          return init(this.converter, assign({}, this.attributes, attributes))
        },
        withConverter: function (converter) {
          return init(assign({}, this.converter, converter), this.attributes)
        }
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(converter) }
      }
    )
  }

  var api = init(defaultConverter, { path: '/' });
  /* eslint-enable no-var */

  return api;

})));

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendRudderStackPageView = exports.sendQualifiedToRudderStack = exports.sendMarketoToRudderStack = exports.sendIdentifyEvent = exports.send6senseToRudderStack = exports.loadRudderStack = exports.loadOneTrust = exports["default"] = exports.checkCookieConsent = exports.appendOneTrustCookieData = exports.append6SenseData = void 0;
var _jsCookie = _interopRequireDefault(require("js-cookie"));
var _getQueryParam = _interopRequireDefault(require("./getQueryParam"));
var _getPageTitle = _interopRequireDefault(require("./getPageTitle"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var append6SenseData = function append6SenseData(originalData) {
  var data = originalData;
  if (typeof localStorage !== "undefined" && typeof localStorage._6senseCompanyDetails !== "undefined") {
    try {
      var _6senseData = JSON.parse(window.localStorage.getItem("_6senseCompanyDetails"));
      data.company_annual_revenue_6sense = _6senseData.company.annual_revenue;
      data.company_name_6sense = _6senseData.company.name;
      data.company_state_6sense = _6senseData.company.state;
      data.confidence_6sense = _6senseData.confidence;
      data.company_country_6sense = _6senseData.company.country;
      data.company_domain_6sense = _6senseData.company.domain;
      data.company_employee_count_6sense = _6senseData.company.employee_count;
      data.company_employee_range_6sense = _6senseData.company.employee_range;
      data.company_industry_6sense = _6senseData.company.industry;
      data.company_naics_6sense = _6senseData.company.naics;
      data.company_naics_description_6sense = _6senseData.company.naics_description;
      data.profile_fit_6sense = _6senseData.profile_fit;
      data.company_country_iso_code_6sense = _6senseData.company.country_iso_code;
      data.company_region_6sense = _6senseData.company.region;
      data.company_revenue_range_6sense = _6senseData.company.revenue_range;
      data.scoreObject_6sense = _6senseData.scores;
      data.segmentsObject_6sense = _6senseData.segments;
      data.segments_ids_6sense = _6senseData.segments.ids.join("|");
      data.company_sic_6sense = _6senseData.company.sic;
      data.company_sic_description_6sense = _6senseData.company.sic_description;
    } catch (_unused) {
      // JSON Parse failed, don't send any event
    }
  }
  return data;
};
exports.append6SenseData = append6SenseData;
var appendOneTrustCookieData = function appendOneTrustCookieData(originalData) {
  var data = originalData;
  var oneTrustCookie = _jsCookie["default"].get("OptanonConsent");
  var interactionCount = (0, _getQueryParam["default"])("interactionCount", oneTrustCookie);
  var consentId = (0, _getQueryParam["default"])("consentId", oneTrustCookie);
  var groups = (0, _getQueryParam["default"])("groups", oneTrustCookie);
  var awaitingReconsent = (0, _getQueryParam["default"])("AwaitingReconsent", oneTrustCookie);
  data.ot_interactionCount = interactionCount;
  data.ot_consentId = consentId;
  data.ot_groups = groups;
  data.ot_awaitingReconsent = awaitingReconsent;
  return data;
};
exports.appendOneTrustCookieData = appendOneTrustCookieData;
var sendRudderStackPageView = function sendRudderStackPageView(pageTitle) {
  if (typeof rudderanalytics !== "undefined") {
    var data = appendOneTrustCookieData({});
    if (typeof _jsCookie["default"].get("_mkto_trk") !== "undefined") {
      data.mkto_trk = _jsCookie["default"].get("_mkto_trk");
    }
    // eslint-disable-next-line no-undef
    rudderanalytics.page(pageTitle, data);
  }
};
exports.sendRudderStackPageView = sendRudderStackPageView;
var checkCookieConsent = function checkCookieConsent(groupId) {
  // checks if consent given for category, ex: C0002
  var consent = false;
  var oneTrustCookie = _jsCookie["default"].get("OptanonConsent");
  var groups = (0, _getQueryParam["default"])("groups", oneTrustCookie);
  var arrGroups = groups.split(",");
  arrGroups.forEach(function (el) {
    if (el.includes("".concat(groupId, ":"))) {
      var arrGroup = el.split(":");
      if (arrGroup.length === 2 && arrGroup[1] === "1") {
        consent = true;
      }
    }
  });
  return consent;
};
exports.checkCookieConsent = checkCookieConsent;
var sendIdentifyEvent = function sendIdentifyEvent(traits) {
  if (typeof rudderanalytics !== "undefined") {
    rudderanalytics.identify("", traits);
  }
};
exports.sendIdentifyEvent = sendIdentifyEvent;
var sendMarketoToRudderStack = function sendMarketoToRudderStack() {
  var marketoTracking = _jsCookie["default"].get("_mkto_trk");
  if (window.localStorage.getItem("_localmkto_trk") !== marketoTracking && typeof marketoTracking !== "undefined") {
    var data = {
      mkto_trk: marketoTracking
    };
    sendIdentifyEvent(data);
    window.localStorage.setItem("_localmkto_trk", marketoTracking);
  }
};
exports.sendMarketoToRudderStack = sendMarketoToRudderStack;
var eventTracking = function eventTracking(eventData) {
  console.log("loading eventTracking");
  var data = appendOneTrustCookieData(eventData);
  // Add munchkin cookie to GTM and rudderstack
  if (typeof _jsCookie["default"].get("_mkto_trk") !== "undefined") {
    data.mkto_trk = _jsCookie["default"].get("_mkto_trk");
  }
  if (typeof dataLayer !== "undefined") {
    dataLayer = dataLayer || [];
    // eslint-disable-next-line no-undef
    dataLayer.push(data);
  }
  if (typeof rudderanalytics !== "undefined") {
    var eventName = data.event;
    if (data.hasOwnProperty("event")) {
      delete data.event;
    }
    // remove extra props added by data layer from rudderstack
    if (data.hasOwnProperty("gtm.uniqueEventId")) {
      delete data["gtm.uniqueEventId"];
    }
    if (data.hasOwnProperty("track.properties")) {
      delete data["track.properties"];
    }
    // eslint-disable-next-line no-undef
    rudderanalytics.track(eventName, data);
  }
};
var sendQualifiedToRudderStack = function sendQualifiedToRudderStack() {
  window.qualified("handleEvents", function (name, data) {
    var _data$bot, _data$bot2, _data$sender;
    var eventData = {
      event: "Qualified Chat Custom Action",
      qualifiedAction: name,
      qualifiedBotId: data === null || data === void 0 ? void 0 : (_data$bot = data.bot) === null || _data$bot === void 0 ? void 0 : _data$bot.id,
      qualifiedBotName: data === null || data === void 0 ? void 0 : (_data$bot2 = data.bot) === null || _data$bot2 === void 0 ? void 0 : _data$bot2.name,
      qualifiedSenderType: data === null || data === void 0 ? void 0 : (_data$sender = data.sender) === null || _data$sender === void 0 ? void 0 : _data$sender.type
    };
    eventTracking(eventData);
  });
};
exports.sendQualifiedToRudderStack = sendQualifiedToRudderStack;
var send6senseToRudderStack = function send6senseToRudderStack() {
  var eventName = {
    event: "company_details_updated_6sense"
  };
  var eventData = append6SenseData(eventName);
  if (window.localStorage.getItem("_6senseCompanyDetails") !== window.localStorage.getItem("_local6senseCompanyDetails")) {
    eventTracking(eventData);
    sendIdentifyEvent(eventData);
    window.localStorage.setItem("_local6senseCompanyDetails", window.localStorage.getItem("_6senseCompanyDetails"));
  }
};
exports.send6senseToRudderStack = send6senseToRudderStack;
var loadOneTrust = function loadOneTrust() {
  console.log("OneTrust", OneTrust)
  if (typeof OneTrust !== "undefined") {
    // eslint-disable-next-line no-undef
    OneTrust.OnConsentChanged(function (e) {
      var eventData = {
        event: "Onetrust Consent Updated"
      };
      eventTracking(eventData);
    });
  } else {
    setTimeout(loadOneTrust, 300);
  }
};
exports.loadOneTrust = loadOneTrust;
var loadRudderStack = function loadRudderStack(seo) {
  if (typeof rudderanalytics !== "undefined") {
    sendRudderStackPageView((0, _getPageTitle["default"])(seo));
    document.addEventListener("6si_company_details_loaded", function () {
      send6senseToRudderStack();
    }, {
      once: true
    });
    if (typeof qualified !== "undefined") {
      sendQualifiedToRudderStack();
    }
    if (typeof Munchkin !== "undefined") {
      sendMarketoToRudderStack();
    }
  } else {
    setTimeout(loadRudderStack, 300);
  }
};
exports.loadRudderStack = loadRudderStack;
  debugger;
loadOneTrust();
var _default = eventTracking;
exports["default"] = _default;

},{"./getPageTitle":3,"./getQueryParam":4,"js-cookie":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var getPageTitle = function getPageTitle(seo) {
  var title = "";
  if (_typeof(seo) === "object") {
    var _seo$metaTags;
    var metaTitle = seo === null || seo === void 0 ? void 0 : (_seo$metaTags = seo.metaTags) === null || _seo$metaTags === void 0 ? void 0 : _seo$metaTags.filter(function (meta) {
      return meta.key === "title";
    }).shift();
    if (metaTitle && metaTitle.hasOwnProperty("value")) {
      title = metaTitle.value;
    }
  }
  return title;
};
var _default = getPageTitle;
exports["default"] = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var getQueryParam = function getQueryParam(queryName, queryPath) {
  queryName = queryName.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); // eslint-disable-line
  var regex = new RegExp("[\\?&]".concat(queryName, "=([^&#]*)"));
  var results = regex.exec(queryPath);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};
var _default = getQueryParam;
exports["default"] = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debugBody = void 0;
// eslint-disable-next-line import/prefer-default-export
var debugBody = "\n    var is_DB_Debug = true;\n    var db_debug = function(){}\n\n    function db_marketopages_getCookie(name) {\n        var cookie_match = document.cookie.match('(^|;)\\\\s*' + name + '\\\\s*=\\\\s*([^;]+)');\n        if(cookie_match) {\n            return cookie_match.pop();\n        }\n        return '';\n    }\n\n    var cookie_db_debug = db_marketopages_getCookie('wp-db_debug');\n    if(cookie_db_debug != '') {\n        is_DB_Debug = true;\n    }\n\n    if (is_DB_Debug) {\n      db_debug = console.log.bind(window.console)\n    }\n";
exports.debugBody = debugBody;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onetrustBody = void 0;
// eslint-disable-next-line import/prefer-default-export
var onetrustBody = "\nfunction OptanonWrapper() {\n    db_debug(\"OptanonWrapper():DB:v1.3\")\n  \n    let otInitialGroupsStr = null;\n    let otActiveGroupsStr = null;\n    // Get initial OnetrustActiveGroups ids\n    if(typeof OptanonWrapperCount == \"undefined\"){\n      db_debug(\"otInitialGroups()\", OnetrustActiveGroups);\n      OptanonWrapperCount = '';\n      otInitialGroupsStr = OnetrustActiveGroups\n    }\n    otActiveGroupsStr =  OnetrustActiveGroups;\n    console.log(\"loading OneTrustBody\")\n    // Load rudderstack\n    rudderanalytics.load(\"2H6RrJEnuV5PtDHQ3L6WcYPsSgV\",\"https://ue.databricks.com\", {\n        cookieConsentManager: {\n            oneTrust: {\n                enabled: true\n            }\n        }\n    });\n\n    //Delete cookies\n    otRemoveOptOutCookies(otActiveGroupsStr);\n  \n    function otRemoveOptOutCookies(otActiveGroupsStr)\n    {\n        db_debug(\"otRemoveOptOutCookies()\");\n  \n        var otDomainGroups = JSON.parse(JSON.stringify(Optanon.GetDomainData().Groups));\n        var dbDomainGroups = [\"C0001\",\"C0002\",\"C0003\",\"C0004\"];\n        var erasedCookie = false;\n  \n        dbDomainGroups.forEach((domainGroup) => {\n            // check if group is inactive\n            if (!otActiveGroupsStr.includes(domainGroup)) {\n                // if inactive, time to delete cookies for that group\n                for(var i=0; i < otDomainGroups.length; i++){\n                    // small array so brute force search\n                    if(otDomainGroups[i]['CustomGroupId'] == domainGroup){\n                        for(var j=0; j < otDomainGroups[i]['Cookies'].length; j++){\n                            var regexp = new RegExp(\"^(.*;)?\\\\s*\" + otDomainGroups[i]['Cookies'][j]['Name'] + \"\\\\s*=\\\\s*[^;]+(.*)?$\")\n                            if (document.cookie.match(regexp)) {\n                                db_debug(\"Found cookie to erase: \" + otDomainGroups[i]['Cookies'][j]['Name'])\n                                erasedCookie = true;\n                                eraseCookie(otDomainGroups[i]['Cookies'][j]['Name']);\n                            }\n                        }\n                    }\n                }\n            }\n        });\n    }\n  \n      //Delete cookie\n      function eraseCookie(name) {\n          db_debug(\"eraseCookie(\" + name + \")\")\n  \n          // Delete DB domain cookies just to be sure\n          document.cookie = name + \"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Domain=.databricks.com\";\n          document.cookie = name + \"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Domain=.databricksweb.com\";\n  \n          //Delete root path cookies\n          domainName = window.location.hostname;\n          document.cookie = name+'=; Max-Age=-99999999; Path=/;Domain='+ domainName;\n          document.cookie = name+'=; Max-Age=-99999999; Path=/;';\n  \n          //Delete LSO incase LSO being used, cna be commented out.\n          localStorage.removeItem(name);\n  \n          //Check for the current path of the page\n          pathArray = window.location.pathname.split('/');\n          //Loop through path hierarchy and delete potential cookies at each path.\n          for (var i=0; i < pathArray.length; i++){\n              if (pathArray[i]){\n                  //Build the path string from the Path Array e.g /site/login\n                  var currentPath = pathArray.slice(0,i+1).join('/');\n                  document.cookie = name+'=; Max-Age=-99999999; Path=' + currentPath + ';Domain='+ domainName;\n                  document.cookie = name+'=; Max-Age=-99999999; Path=' + currentPath + ';';\n                  //Maybe path has a trailing slash!\n                  document.cookie = name+'=; Max-Age=-99999999; Path=' + currentPath + '/;Domain='+ domainName;\n                  document.cookie = name+'=; Max-Age=-99999999; Path=' + currentPath + '/;';\n              }\n          }\n  \n          var regexp = new RegExp(\"^(.*;)?\\\\s*\" + name + \"\\\\s*=\\\\s*[^;]+(.*)?$\")\n          if (document.cookie.match(regexp)) {\n              db_debug(\"Error: Cookie not deleted (\" + name + \")\")\n          }\n          else {\n              // not needed extra debug info\n              // db_debug(\"Cookie successfully deleted (\" + name + \")\")\n          }\n      }\n  }\n";
exports.onetrustBody = onetrustBody;

},{}]},{},[5,2,6]);
