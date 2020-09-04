"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("@retailwe/ui-common/index");
var index_2 = require("@retailwe/ui-common/index");
var default_1 = (function (_super) {
    tslib_1.__extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.externalClasses = ['wr-class'];
        _this.properties = {
            size: String,
            mark: Boolean,
            color: String,
            plain: Boolean,
            round: Boolean,
            textColor: String,
            type: String,
            closeable: Boolean,
        };
        _this.data = {};
        return _this;
    }
    default_1.prototype.onTap = function () {
        this.triggerEvent('click');
    };
    default_1.prototype.onClose = function () {
        this.triggerEvent('close');
    };
    default_1 = tslib_1.__decorate([
        index_2.wxComponent()
    ], default_1);
    return default_1;
}(index_1.SuperComponent));
exports.default = default_1;
