"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var flatTool_1 = require("./flatTool");
var RAW_LIFE_CYCLES = ['Created', 'Attached', 'Ready', 'Moved', 'Detached'];
var NATIVE_LIFE_CYCLES = RAW_LIFE_CYCLES.map(function (k) { return k.toLowerCase(); });
var COMPONENT_NATIVE_PROPS = [
    'externalClasses',
    'properties',
    'data',
    'options',
    'relations',
    'behaviors',
];
function toComponent(options) {
    if (options.properties) {
        Object.keys(options.properties).forEach(function (k) {
            var opt = options.properties[k];
            if (!flatTool_1.isPlainObject(opt)) {
                opt = { type: opt };
            }
            options.properties[k] = opt;
        });
    }
    if (!options.methods)
        options.methods = {};
    var inits = {};
    Object.getOwnPropertyNames(options).forEach(function (k) {
        var desc = Object.getOwnPropertyDescriptor(options, k);
        if (!desc)
            return;
        if (NATIVE_LIFE_CYCLES.indexOf(k) < 0 && typeof desc.value === 'function') {
            Object.defineProperty(options.methods, k, desc);
            delete options[k];
        }
        else if (COMPONENT_NATIVE_PROPS.indexOf(k) < 0) {
            inits[k] = desc;
        }
    });
    if (Object.keys(inits).length) {
        var oldCreated_1 = options.created;
        options.created = function () {
            Object.defineProperties(this, inits);
            if (oldCreated_1)
                oldCreated_1.apply(this, arguments);
        };
    }
    return options;
}
exports.toComponent = toComponent;
function wxComponent() {
    return function (constructor) {
        var WxComponent = (function (_super) {
            tslib_1.__extends(WxComponent, _super);
            function WxComponent() {
                var _args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _args[_i] = arguments[_i];
                }
                return _super.call(this) || this;
            }
            WxComponent.prototype.created = function () {
                _super.prototype.created && _super.prototype.created.call(this);
            };
            WxComponent.prototype.attached = function () {
                _super.prototype.attached && _super.prototype.attached.call(this);
            };
            WxComponent.prototype.detached = function () {
                _super.prototype.detached && _super.prototype.detached.call(this);
            };
            return WxComponent;
        }(constructor));
        var current = new WxComponent();
        current.options = current.options || {};
        if (current.options.addGlobalClass === undefined) {
            current.options.addGlobalClass = true;
        }
        var obj = toComponent(flatTool_1.toObject(current));
        Component(obj);
    };
}
exports.wxComponent = wxComponent;
