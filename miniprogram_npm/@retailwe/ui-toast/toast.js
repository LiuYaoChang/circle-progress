"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function getInstance(context, selector) {
    if (selector === void 0) { selector = '#wr-toast'; }
    if (!context) {
        var pages = getCurrentPages();
        var page = pages[pages.length - 1];
        context = page.$$basePage || page;
    }
    var instance = context && context.selectComponent(selector);
    if (!instance) {
        console.warn("\u672A\u627E\u5230toast\u7EC4\u4EF6,\u8BF7\u68C0\u67E5selector\u662F\u5426\u6B63\u786E");
        return null;
    }
    return instance;
}
function default_1(options) {
    var context = options.context, selector = options.selector, _options = tslib_1.__rest(options, ["context", "selector"]);
    var instance = getInstance(context, selector);
    if (instance) {
        instance.show(tslib_1.__assign(tslib_1.__assign({}, _options), { duration: _options.duration || 2000 }));
    }
}
exports.default = default_1;
