"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionError = exports.LocationType = void 0;
var LocationType;
(function (LocationType) {
    LocationType["River"] = "RIVER";
    LocationType["Lake"] = "LAKE";
    LocationType["Stack"] = "STACK";
    LocationType["Nerts"] = "NERTS";
})(LocationType || (exports.LocationType = LocationType = {}));
var ActionError = /** @class */ (function (_super) {
    __extends(ActionError, _super);
    function ActionError(msg) {
        var _this = _super.call(this, msg) || this;
        // Set the prototype explicitly.
        Object.setPrototypeOf(_this, ActionError.prototype);
        return _this;
    }
    return ActionError;
}(Error));
exports.ActionError = ActionError;
