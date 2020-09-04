"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("@retailwe/ui-common/index");
var index_2 = require("@retailwe/ui-common/index");
var Divider = (function (_super) {
    tslib_1.__extends(Divider, _super);
    function Divider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.externalClasses = ['wr-class', 'wr-class-content'];
        _this.options = {
            addGlobalClass: true,
            multipleSlots: true,
        };
        _this.properties = {
            dashed: {
                type: Boolean,
                value: false,
            },
            hairline: {
                type: Boolean,
                value: false,
            },
            contentPosition: {
                type: String,
                value: '',
            },
            borderColor: {
                type: String,
                value: '',
            },
            textColor: {
                type: String,
                value: '',
            },
            customStyle: {
                type: String,
                value: '',
            },
        };
        _this.data = {};
        return _this;
    }
    Divider = tslib_1.__decorate([
        index_2.wxComponent()
    ], Divider);
    return Divider;
}(index_1.SuperComponent));
exports.default = Divider;
