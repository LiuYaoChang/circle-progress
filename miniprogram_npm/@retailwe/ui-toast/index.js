"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("@retailwe/ui-common/index");
var index_2 = require("@retailwe/ui-common/index");
var DefaultOpions = {
    icon: 'success',
    iconColor: '',
    iconSize: '',
    text: '',
    textColor: '',
    zIndex: 5002,
    fontSize: '',
    duration: 2000,
};
var Toast = (function (_super) {
    tslib_1.__extends(Toast, _super);
    function Toast() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hideTimer = null;
        _this.removeTimer = null;
        _this.data = {
            inserted: false,
            show: false,
        };
        _this.externalClasses = ['wr-class'];
        _this.properties = {
            icon: String,
            iconColor: String,
            iconSize: null,
            text: String,
            textColor: String,
            zIndex: Number,
            fontSize: null,
            duration: Number,
        };
        return _this;
    }
    Toast.prototype.show = function (options) {
        var _this = this;
        if (this.hideTimer)
            clearTimeout(this.hideTimer);
        if (this.removeTimer)
            clearTimeout(this.removeTimer);
        var data = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, DefaultOpions), options), { show: true, inserted: true });
        var duration = data.duration;
        this.setData(data);
        this.hideTimer = setTimeout(function () {
            _this.hide();
        }, duration);
    };
    Toast.prototype.hide = function () {
        var _this = this;
        this.setData({ show: false });
        this.removeTimer = setTimeout(function () {
            _this.setData({
                inserted: false,
            });
        }, 300);
    };
    Toast = tslib_1.__decorate([
        index_2.wxComponent()
    ], Toast);
    return Toast;
}(index_1.SuperComponent));
exports.default = Toast;
