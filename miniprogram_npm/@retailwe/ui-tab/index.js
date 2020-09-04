"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("@retailwe/ui-common/index");
var index_2 = require("@retailwe/ui-common/index");
var Tab = (function (_super) {
    tslib_1.__extends(Tab, _super);
    function Tab() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.externalClasses = ['wr-class', 'wr-class-active'];
        _this.properties = {
            status: {
                type: Number,
                value: 0,
            },
            tabList: {
                type: Array,
                value: [],
            },
            isScroll: {
                type: Boolean,
                value: true,
            },
            lineColor: String,
            lineHeight: Number,
            lineWidth: Number,
        };
        return _this;
    }
    Tab.prototype.tabChange = function (e) {
        var status = this.properties.status;
        var _status = e.target.dataset.status;
        if (_status == undefined || status == _status)
            return;
        this.triggerEvent('tabChange', _status);
    };
    Tab = tslib_1.__decorate([
        index_2.wxComponent()
    ], Tab);
    return Tab;
}(index_1.SuperComponent));
exports.default = Tab;
