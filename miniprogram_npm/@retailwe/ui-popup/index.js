"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("@retailwe/ui-common/index");
var index_2 = require("@retailwe/ui-common/index");
var Popup = (function (_super) {
    tslib_1.__extends(Popup, _super);
    function Popup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.options = {
            multipleSlots: true,
        };
        _this.externalClasses = ['wr-class'];
        _this.properties = {
            show: {
                type: Boolean,
                value: false,
                observer: function (show) {
                    var _this = this;
                    if (this.animationTimer) {
                        clearTimeout(this.animationTimer);
                    }
                    if (show) {
                        this.setData({ isShow: true });
                        this.startAnimation(show);
                    }
                    else {
                        this.startAnimation(show).then(function () {
                            _this.setData({ isShow: false });
                        });
                    }
                },
            },
            fixed: {
                type: Boolean,
                value: true,
            },
            transition: {
                type: String,
                value: '',
            },
            zIndex: {
                type: Number,
                value: 2001,
            },
            position: {
                type: String,
                value: 'center',
            },
            duration: {
                type: null,
                value: { enter: 300, leave: 200 },
            },
            timingFunction: {
                type: String,
                value: 'ease',
            },
            mask: {
                type: Boolean,
                value: true,
            },
            maskClosable: {
                type: Boolean,
                value: true,
            },
            maskColor: {
                type: String,
                value: 'rgba(0,0,0,0.5)',
            },
            maskStyle: String,
            contentStyle: String,
            bottomSafeAreaStyle: String,
            destroyOnClose: {
                type: Boolean,
                value: true,
            },
            forbideScroll: {
                type: Boolean,
                value: false,
            },
            isIcon: {
                type: Boolean,
                value: false,
            },
            catchTouchMove: {
                type: Boolean,
                value: true,
            },
        };
        _this.data = {
            isShow: false,
            animationStyle: {
                mask: '',
                content: '',
            },
        };
        return _this;
    }
    Popup.prototype.startAnimation = function (isShow) {
        var _this = this;
        var _a = this.getAnimationStyle(isShow), animationStyle = _a.animationStyle, duration = _a.duration;
        return new Promise(function (resolve) {
            _this.setData({ animationStyle: animationStyle }, function () {
                _this.animationTimer = setTimeout(function () {
                    var eventName = isShow ? 'openover' : 'closeover';
                    _this.triggerEvent(eventName);
                    resolve();
                }, duration);
            });
        });
    };
    Popup.prototype.getDuration = function (isShow) {
        var duration = this.properties.duration;
        if (typeof duration === 'object') {
            duration = isShow ? duration.enter : duration.leave;
        }
        return duration || 0;
    };
    Popup.prototype.getAnimationStyle = function (isShow) {
        var duration = this.getDuration(isShow);
        var _a = this.properties, position = _a.position, transition = _a.transition, timingFunction = _a.timingFunction;
        var config = (isShow ? 'enter' : 'leave') + " " + duration + "ms " + timingFunction + " both";
        var maskAnimationStyle = "fade-" + config;
        var contentAnimationStyle = (transition ||
            (position === 'center' ? 'fade' : 'slide-' + position)) + "-" + config;
        return {
            animationStyle: {
                mask: "animation:" + maskAnimationStyle + ";-webkit-animation:" + maskAnimationStyle + ";",
                content: "animation:" + contentAnimationStyle + ";-webkit-animation:" + contentAnimationStyle + ";",
            },
            duration: duration,
        };
    };
    Popup.prototype.bindTapMask = function () {
        var maskClosable = this.properties.maskClosable;
        if (maskClosable) {
            this.close();
        }
    };
    Popup.prototype.close = function () {
        this.triggerEvent('close');
    };
    Popup.prototype.noop = function () {
        return;
    };
    Popup = tslib_1.__decorate([
        index_2.wxComponent()
    ], Popup);
    return Popup;
}(index_1.SuperComponent));
exports.default = Popup;
