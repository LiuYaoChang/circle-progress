"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("@retailwe/ui-common/index");
var index_2 = require("@retailwe/ui-common/index");
var Icon = (function (_super) {
    tslib_1.__extends(Icon, _super);
    function Icon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.externalClasses = ['wr-class'];
        _this.properties = {
            name: {
                type: String,
                require: true,
                observer: function (val) {
                    this.setData({
                        isImageName: val.indexOf('/') !== -1,
                    });
                },
            },
            classPrefix: {
                type: String,
                value: 'wr',
            },
            size: {
                type: null,
                value: 24,
            },
            color: {
                type: String,
                value: '',
            },
            info: String,
            dot: Boolean,
            customStyle: String,
        };
        return _this;
    }
    Icon = tslib_1.__decorate([
        index_2.wxComponent()
    ], Icon);
    return Icon;
}(index_1.SuperComponent));
exports.default = Icon;
