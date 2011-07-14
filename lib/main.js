let tabs = require("tabs");
let {Cu} = require("chrome");
let J = JSON.stringify;
let DEBUG = true;
let reportError = DEBUG ? console.log : function() {};

let Svc = {};
Cu.import("resource://gre/modules/Services.jsm", Svc);

tabs.on('ready', function(tab) {
  reportError("tab activated");
  let gBrowser = Svc.Services.wm.getMostRecentWindow("navigator:browser").gBrowser;
  let doc = gBrowser.contentDocument;
  let browser = gBrowser.getBrowserForDocument(doc);
  if (browser.engines) {
    reportError(Object.keys(browser.engines[0]));
    browser.engines.forEach(function({uri, title, icon}) {
      let type = (/xml$/).test(uri) ? 1 : 2;
      try {
        Svc.Services.search.addEngine(uri,type,icon,false);
      } catch (ex) {
        reportError(J(ex));
      }
    });
  }
});

