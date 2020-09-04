"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("@retailwe/ui-common/index");
var index_2 = require("@retailwe/ui-common/index");
var AddCart = (function (_super) {
    tslib_1.__extends(AddCart, _super);
    function AddCart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.externalClasses = ['wr-class'];
        _this.properties = {
            icon: {
                type: String,
                value: 'add-cart',
            },
            size: {
                type: null,
                value: 48,
            },
            color: {
                type: String,
                value: '#FA550F',
            },
            info: String,
            dot: Boolean,
            customStyle: String,
        };
        _this.data = {};
        _this.lock = false;
        return _this;
    }
    AddCart.prototype.onClickIcon = function () {
        this.triggerEvent('click');
    };
    AddCart = tslib_1.__decorate([
        index_2.wxComponent()
    ], AddCart);
    return AddCart;
}(index_1.SuperComponent));
exports.default = AddCart;
