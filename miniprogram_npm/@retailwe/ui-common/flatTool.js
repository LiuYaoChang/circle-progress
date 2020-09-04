"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function getPrototypeOf(obj) {
    return Object.getPrototypeOf ? Object.getPrototypeOf(obj) : obj.__proto__;
}
exports.getPrototypeOf = getPrototypeOf;
function iterateInheritedPrototype(callback, fromCtor, toCtor, includeToCtor) {
    if (includeToCtor === void 0) { includeToCtor = true; }
    var proto = fromCtor.prototype || fromCtor;
    var toProto = toCtor.prototype || toCtor;
    while (proto) {
        if (!includeToCtor && proto === toProto)
            break;
        if (callback(proto) === false)
            break;
        if (proto === toProto)
            break;
        proto = getPrototypeOf(proto);
    }
}
exports.iterateInheritedPrototype = iterateInheritedPrototype;
function toObject(something, options) {
    if (options === void 0) { options = {}; }
    var obj = {};
    if (!isObject(something))
        return obj;
    var excludes = options.excludes || ['constructor'];
    var _a = options.enumerable, enumerable = _a === void 0 ? true : _a, _b = options.configurable, configurable = _b === void 0 ? 0 : _b, _c = options.writable, writable = _c === void 0 ? 0 : _c;
    var defaultDesc = {};
    if (enumerable !== 0)
        defaultDesc.enumerable = enumerable;
    if (configurable !== 0)
        defaultDesc.configurable = configurable;
    if (writable !== 0)
        defaultDesc.writable = writable;
    iterateInheritedPrototype(function (proto) {
        Object.getOwnPropertyNames(proto).forEach(function (key) {
            if (excludes.indexOf(key) >= 0)
                return;
            if (obj.hasOwnProperty(key))
                return;
            var desc = Object.getOwnPropertyDescriptor(proto, key);
            var fnKeys = ['get', 'set', 'value'];
            fnKeys.forEach(function (k) {
                if (typeof desc[k] === 'function') {
                    var oldFn_1 = desc[k];
                    desc[k] = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return oldFn_1.apply(options.hasOwnProperty('bindTo') ? options.bindTo : this, args);
                    };
                }
            });
            Object.defineProperty(obj, key, tslib_1.__assign(tslib_1.__assign({}, desc), defaultDesc));
        });
    }, something, options.till || Object, false);
    return obj;
}
exports.toObject = toObject;
function isObject(something) {
    var type = typeof something;
    return something !== null && (type === 'function' || type === 'object');
}
exports.isObject = isObject;
function isPlainObject(something) {
    return Object.prototype.toString.call(something) === '[object Object]';
}
exports.isPlainObject = isPlainObject;
