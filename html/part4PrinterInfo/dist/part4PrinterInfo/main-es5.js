(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
        /***/ "./$$_lazy_route_resource lazy recursive": 
        /*!******************************************************!*\
          !*** ./$$_lazy_route_resource lazy namespace object ***!
          \******************************************************/
        /*! no static exports found */
        /***/ (function (module, exports) {
            function webpackEmptyAsyncContext(req) {
                // Here Promise.resolve().then() is used instead of new Promise() to prevent
                // uncaught exception popping up in devtools
                return Promise.resolve().then(function () {
                    var e = new Error("Cannot find module '" + req + "'");
                    e.code = 'MODULE_NOT_FOUND';
                    throw e;
                });
            }
            webpackEmptyAsyncContext.keys = function () { return []; };
            webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
            module.exports = webpackEmptyAsyncContext;
            webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";
            /***/ 
        }),
        /***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html": 
        /*!**************************************************************************!*\
          !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
          \**************************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("<router-outlet></router-outlet>\n");
            /***/ 
        }),
        /***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/devices/admin/admin.component.html": 
        /*!******************************************************************************************!*\
          !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/devices/admin/admin.component.html ***!
          \******************************************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("<div class=\"admin-panel\">\n  <ng-container *ngIf=\"!isLogIn\">\n    <div class=\"login-form bg-black\">\n      <form [formGroup]=\"loginForm\" (ngSubmit)=\"logIn()\">\n        <mat-form-field>\n          <input matInput placeholder=\"Login\" name=\"login\" formControlName=\"loginControl\">\n        </mat-form-field>\n        <mat-form-field>\n          <input matInput placeholder=\"Password\" name=\"password\" formControlName=\"passControl\">\n        </mat-form-field>\n        <button mat-raised-button type=\"submit\" color=\"primary\">Вход</button>\n      </form>\n    </div>\n  </ng-container>\n\n  <ng-container *ngIf=\"isLogIn\">\n    <header class=\"container\">\n      <div class=\"p-2 float-left\">\n        <mat-form-field class=\"\" style=\"width: 250px;\">\n          <input type=\"text\" placeholder=\"Поиск помпании\" aria-label=\"Number\" matInput [formControl]=\"customerControl\"\n                 [matAutocomplete]=\"auto\">\n          <mat-autocomplete #auto=\"matAutocomplete\">\n            <mat-option *ngFor=\"let option of filteredCustomers | async\" [value]=\"option['title']\"\n                        (click)=\"setCustomer(option['id'])\">\n              {{option['title']}}\n            </mat-option>\n          </mat-autocomplete>\n          <mat-hint>ID компании: {{cuid}}</mat-hint>\n        </mat-form-field>\n      </div>\n      <div class=\"p-2 float-left\">\n        <form [formGroup]=\"companyForm\" (ngSubmit)=\"addCompany()\">\n          <mat-form-field>\n            <input matInput placeholder=\"Название\" name=\"title\" formControlName=\"title\" required>\n            <mat-hint *ngIf=\"reqCompany === undefined\">Добавить новую компанию</mat-hint>\n            <mat-hint *ngIf=\"reqCompany !== undefined\" class=\"text-orange\">{{reqCompany['status']}}\n              : {{reqCompany['result']}}</mat-hint>\n          </mat-form-field>\n          <button mat-raised-button type=\"submit\" color=\"primary\" class=\"px-2\"\n                  [disabled]=\"companyForm.controls['title'].hasError('required')\">Добавить\n          </button>\n        </form>\n      </div>\n      <div class=\"socket-init\">\n        <button mat-raised-button color=\"accent\" (click)=\"go('device')\">Выход</button>\n        <!--button mat-raised-button id=\"addDevice\">Добавить</button-->\n      </div>\n    </header>\n    <mat-sidenav-container *ngIf=\"customers\">\n      <mat-sidenav opened mode=\"side\" class=\"px-2 sidenav\">\n        <h3>Офис:</h3>\n        <mat-form-field class=\"full-width\" *ngIf=\"clients.length > 0\">\n          <mat-select>\n            <mat-option *ngFor=\"let option of clients\" [value]=\"option['name']\" (click)=\"setClient(option['id'])\">\n              {{option['name']}}\n            </mat-option>\n          </mat-select>\n          <mat-hint>ID клиента: {{cid}}</mat-hint>\n        </mat-form-field>\n\n        <form [formGroup]=\"clientForm\" (ngSubmit)=\"addClient()\" *ngIf=\"cuid !== 0\">\n          <mat-form-field>\n            <input matInput placeholder=\"Название\" name=\"name\" formControlName=\"name\" required>\n            <mat-hint *ngIf=\"reqClient === undefined\">Добавить новый клиент</mat-hint>\n            <mat-hint *ngIf=\"reqClient !== undefined\" class=\"text-orange\">{{reqClient['status']}}\n              : {{reqClient['result']}}</mat-hint>\n          </mat-form-field>\n          <button mat-raised-button type=\"submit\" color=\"primary\" class=\"px-2\"\n                  [disabled]=\"clientForm.controls['name'].hasError('required')\">Добавить\n          </button>\n        </form>\n      </mat-sidenav>\n      <div class=\"container\" *ngIf=\"clients.length\">\n        <form [formGroup]=\"deviceForm\" (ngSubmit)=\"addDevice()\" class=\"device-form\">\n          <mat-form-field>\n            <input matInput placeholder=\"Название\" name=\"productName\" formControlName=\"productName\" required>\n            <mat-hint *ngIf=\"reqDevice === undefined\">Добавить новое устройство</mat-hint>\n            <mat-hint *ngIf=\"reqDevice !== undefined\" class=\"text-orange\">{{reqDevice['status']}}\n              : {{reqDevice['result']}}</mat-hint>\n          </mat-form-field>\n          <mat-form-field>\n            <input matInput placeholder=\"URL\" name=\"url\" formControlName=\"url\" required>\n          </mat-form-field>\n          <mat-form-field>\n            <input matInput placeholder=\"SN\" name=\"serialNumber\" formControlName=\"serialNumber\" required>\n          </mat-form-field>\n          <mat-form-field>\n            <input matInput placeholder=\"Артикль\" name=\"article\" formControlName=\"article\">\n          </mat-form-field>\n          <mat-form-field>\n            <input matInput placeholder=\"Артикль клиента\" name=\"client_article\" formControlName=\"client_article\">\n          </mat-form-field>\n          <button mat-raised-button type=\"submit\" color=\"primary\" class=\"px-2\"\n                  [disabled]=\"deviceForm.controls['productName'].hasError('required')\n                  || deviceForm.controls['url'].hasError('required')\n                  || deviceForm.controls['serialNumber'].hasError('required')\">\n            Добавить\n          </button>\n        </form>\n        <table class=\"device-table\">\n          <thead>\n            <tr>\n              <th>ID</th>\n              <th>Название</th>\n              <th>URL</th>\n              <th>Серийный номер</th>\n              <th>Артикль</th>\n              <th>Артикль клиента</th>\n            </tr>\n          </thead>\n          <tbody>\n          <tr *ngFor=\"let item of devices\">\n            <td>{{item['id']}}</td>\n            <td>{{item['productname']}}</td>\n            <td>{{item['url']}}</td>\n            <td>{{item['sn']}}</td>\n            <td>{{item['article']}}</td>\n            <td>{{item['client_article']}}</td>\n          </tr>\n          </tbody>\n        </table>\n      </div>\n    </mat-sidenav-container>\n  </ng-container>\n</div>\n");
            /***/ 
        }),
        /***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/devices/admin/client/client.component.html": 
        /*!**************************************************************************************************!*\
          !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/devices/admin/client/client.component.html ***!
          \**************************************************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("<p>client works!</p>\n");
            /***/ 
        }),
        /***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/devices/admin/company/company.component.html": 
        /*!****************************************************************************************************!*\
          !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/devices/admin/company/company.component.html ***!
          \****************************************************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("<p>company works!</p>\n");
            /***/ 
        }),
        /***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/devices/admin/device/device.component.html": 
        /*!**************************************************************************************************!*\
          !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/devices/admin/device/device.component.html ***!
          \**************************************************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("<p>device works!</p>\n");
            /***/ 
        }),
        /***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/devices/admin/manage/manage.component.html": 
        /*!**************************************************************************************************!*\
          !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/devices/admin/manage/manage.component.html ***!
          \**************************************************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("<p>manage works!</p>\n");
            /***/ 
        }),
        /***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/devices/devices.component.html": 
        /*!**************************************************************************************!*\
          !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/devices/devices.component.html ***!
          \**************************************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("<div class=\"\">\r\n  <header class=\"container\">\r\n    <div class=\"pt-2\">\r\n      <mat-form-field class=\"\" style=\"width: 250px;\">\r\n        <input type=\"text\" placeholder=\"Поиск помпании\" aria-label=\"Number\" matInput [formControl]=\"customerControl\"\r\n               [matAutocomplete]=\"auto\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let option of filteredCustomers | async\" [value]=\"option['title']\"\r\n                      (click)=\"setCustomer(option['id'])\">\r\n            {{option['title']}}\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"socket-init\">\r\n      <button mat-raised-button id=\"btnInit\" [disabled]=\"cid === 0\">Получить данные с устройств</button>\r\n      <input type=\"hidden\" id=\"info_query\" [value]=\"getQuery\">\r\n      <button mat-raised-button (click)=\"go('admin')\">Админ</button>\r\n      <!--button mat-raised-button id=\"addDevice\">Добавить</button-->\r\n    </div>\r\n  </header>\r\n  <mat-sidenav-container *ngIf=\"customers\">\r\n    <mat-sidenav opened mode=\"side\" class=\"px-2 sidenav\">\r\n      <h3>Офис:</h3>\r\n      <mat-form-field class=\"full-width\" *ngIf=\"clients.length > 0\">\r\n        <mat-select>\r\n          <mat-option *ngFor=\"let option of clients\" [value]=\"option['name']\" (click)=\"setClient(option['id'])\">\r\n            {{option['name']}}\r\n          </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <div class=\"urls-nav\" *ngIf=\"devices.length > 0\">\r\n        <div *ngFor=\"let item of devices, let i = index\" (click)=\"setInfo(item['id']); toggleActive(i, 'dev')\" [ngClass]=\"i===devLI ? 'active': ''\">\r\n          <h4 class=\"cursor-pointer\">{{item['productname']}} <br>\r\n            <small class=\"text-orange\">\r\n              {{item['url']}} <br> {{item['sn']}}\r\n            </small>\r\n          </h4>\r\n        </div>\r\n      </div>\r\n      <input type=\"hidden\" id=\"clientId\" [value]=\"cid\">\r\n      <div class=\"console\" id=\"console\"></div>\r\n    </mat-sidenav>\r\n    <div class=\"container\">\r\n      <ng-container *ngIf=\"dates.length\">\r\n        <mat-list role=\"list\" class=\"dateList\">\r\n          <h4>Даты:</h4>\r\n          <mat-list-item *ngFor=\"let date of dates, let i = index\" role=\"listitem\" (click)=\"setDate(date); toggleActive(i, 'data')\"\r\n                         [ngClass]=\"i===dataLI ? 'cursor-pointer border active': 'cursor-pointer border'\">\r\n            {{date | date:'yyyy-MM-dd HH:mm:ss'}}\r\n          </mat-list-item>\r\n        </mat-list>\r\n        <div class=\"device-info\">&nbsp;\r\n          <ng-container *ngIf=\"device\">\r\n            <h2>{{device['productname']}}</h2>\r\n            <p>Статус: {{device['status']}}</p>\r\n            <p>Серийный номер: {{device['serialnumber']}}</p>\r\n            <p>Сетевой адрес: {{device['url']}}</p>\r\n            <ng-container *ngFor=\"let color of device['cartridge']\">\r\n              <p *ngIf=\"color['black']\">Черный {{color['black'].replace('%', '')}}<br><br>\r\n                <mat-progress-bar mode=\"determinate\" [value]=\"color['black'].replace('%', '')\"\r\n                                  color=\"warn\"></mat-progress-bar>\r\n              </p>\r\n              <p *ngIf=\"color['yellow']\">Желтый {{color['yellow'].replace('%', '')}}<br><br>\r\n                <mat-progress-bar mode=\"determinate\" [value]=\"color['yellow'].replace('%', '')\"\r\n                                  color=\"warn\"></mat-progress-bar>\r\n              </p>\r\n              <p *ngIf=\"color['magenta']\">Пурпурный {{color['magenta'].replace('%', '')}}<br><br>\r\n                <mat-progress-bar mode=\"determinate\" [value]=\"color['magenta'].replace('%', '')\"\r\n                                  color=\"warn\"></mat-progress-bar>\r\n              </p>\r\n              <p *ngIf=\"color['blue']\">Голубой {{color['blue'].replace('%', '')}}<br><br>\r\n                <mat-progress-bar mode=\"determinate\" [value]=\"color['blue'].replace('%', '')\"\r\n                                  color=\"warn\"></mat-progress-bar>\r\n              </p>\r\n            </ng-container>\r\n            <p>Цикл механизма: {{device['printcycles']}}</p>\r\n            <p>Счетчик технического обслуживания:\r\n              <ng-container *ngIf=\"device['kit']\">\r\n                <ng-container *ngIf=\"device['kit'][0]['adfcycles']\">{{device['kit'][0]['adfcycles']}}</ng-container>\r\n                <ng-container\r\n                  *ngIf=\"device['kit'][0]['maintenanceKitCount']\">{{device['kit'][0]['maintenanceKitCount']}}</ng-container>\r\n              </ng-container>\r\n            </p>\r\n            <p>Цикл сканирования: {{device['scancycles']}}</p>\r\n            <h4>Лог:</h4>\r\n            <table>\r\n              <tbody>\r\n              <tr>\r\n                <td></td>\r\n                <td></td>\r\n              </tr>\r\n              </tbody>\r\n            </table>\r\n          </ng-container>\r\n        </div>\r\n      </ng-container>\r\n    </div>\r\n  </mat-sidenav-container>\r\n</div>\r\n");
            /***/ 
        }),
        /***/ "./node_modules/tslib/tslib.es6.js": 
        /*!*****************************************!*\
          !*** ./node_modules/tslib/tslib.es6.js ***!
          \*****************************************/
        /*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function () { return __extends; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function () { return __assign; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function () { return __rest; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function () { return __decorate; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function () { return __param; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function () { return __metadata; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function () { return __awaiter; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function () { return __generator; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function () { return __exportStar; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function () { return __values; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function () { return __read; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function () { return __spread; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function () { return __spreadArrays; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function () { return __await; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function () { return __asyncGenerator; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function () { return __asyncDelegator; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function () { return __asyncValues; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function () { return __makeTemplateObject; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function () { return __importStar; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function () { return __importDefault; });
            /*! *****************************************************************************
            Copyright (c) Microsoft Corporation. All rights reserved.
            Licensed under the Apache License, Version 2.0 (the "License"); you may not use
            this file except in compliance with the License. You may obtain a copy of the
            License at http://www.apache.org/licenses/LICENSE-2.0
            
            THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
            KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
            WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
            MERCHANTABLITY OR NON-INFRINGEMENT.
            
            See the Apache Version 2.0 License for specific language governing permissions
            and limitations under the License.
            ***************************************************************************** */
            /* global Reflect, Promise */
            var extendStatics = function (d, b) {
                extendStatics = Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                    function (d, b) { for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p]; };
                return extendStatics(d, b);
            };
            function __extends(d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            }
            var __assign = function () {
                __assign = Object.assign || function __assign(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                        s = arguments[i];
                        for (var p in s)
                            if (Object.prototype.hasOwnProperty.call(s, p))
                                t[p] = s[p];
                    }
                    return t;
                };
                return __assign.apply(this, arguments);
            };
            function __rest(s, e) {
                var t = {};
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                        t[p] = s[p];
                if (s != null && typeof Object.getOwnPropertySymbols === "function")
                    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                            t[p[i]] = s[p[i]];
                    }
                return t;
            }
            function __decorate(decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                    r = Reflect.decorate(decorators, target, key, desc);
                else
                    for (var i = decorators.length - 1; i >= 0; i--)
                        if (d = decorators[i])
                            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            }
            function __param(paramIndex, decorator) {
                return function (target, key) { decorator(target, key, paramIndex); };
            }
            function __metadata(metadataKey, metadataValue) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
                    return Reflect.metadata(metadataKey, metadataValue);
            }
            function __awaiter(thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) { try {
                        step(generator.next(value));
                    }
                    catch (e) {
                        reject(e);
                    } }
                    function rejected(value) { try {
                        step(generator["throw"](value));
                    }
                    catch (e) {
                        reject(e);
                    } }
                    function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            }
            function __generator(thisArg, body) {
                var _ = { label: 0, sent: function () { if (t[0] & 1)
                        throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
                return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
                function verb(n) { return function (v) { return step([n, v]); }; }
                function step(op) {
                    if (f)
                        throw new TypeError("Generator is already executing.");
                    while (_)
                        try {
                            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                                return t;
                            if (y = 0, t)
                                op = [op[0] & 2, t.value];
                            switch (op[0]) {
                                case 0:
                                case 1:
                                    t = op;
                                    break;
                                case 4:
                                    _.label++;
                                    return { value: op[1], done: false };
                                case 5:
                                    _.label++;
                                    y = op[1];
                                    op = [0];
                                    continue;
                                case 7:
                                    op = _.ops.pop();
                                    _.trys.pop();
                                    continue;
                                default:
                                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                        _ = 0;
                                        continue;
                                    }
                                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                        _.label = op[1];
                                        break;
                                    }
                                    if (op[0] === 6 && _.label < t[1]) {
                                        _.label = t[1];
                                        t = op;
                                        break;
                                    }
                                    if (t && _.label < t[2]) {
                                        _.label = t[2];
                                        _.ops.push(op);
                                        break;
                                    }
                                    if (t[2])
                                        _.ops.pop();
                                    _.trys.pop();
                                    continue;
                            }
                            op = body.call(thisArg, _);
                        }
                        catch (e) {
                            op = [6, e];
                            y = 0;
                        }
                        finally {
                            f = t = 0;
                        }
                    if (op[0] & 5)
                        throw op[1];
                    return { value: op[0] ? op[1] : void 0, done: true };
                }
            }
            function __exportStar(m, exports) {
                for (var p in m)
                    if (!exports.hasOwnProperty(p))
                        exports[p] = m[p];
            }
            function __values(o) {
                var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
                if (m)
                    return m.call(o);
                return {
                    next: function () {
                        if (o && i >= o.length)
                            o = void 0;
                        return { value: o && o[i++], done: !o };
                    }
                };
            }
            function __read(o, n) {
                var m = typeof Symbol === "function" && o[Symbol.iterator];
                if (!m)
                    return o;
                var i = m.call(o), r, ar = [], e;
                try {
                    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                        ar.push(r.value);
                }
                catch (error) {
                    e = { error: error };
                }
                finally {
                    try {
                        if (r && !r.done && (m = i["return"]))
                            m.call(i);
                    }
                    finally {
                        if (e)
                            throw e.error;
                    }
                }
                return ar;
            }
            function __spread() {
                for (var ar = [], i = 0; i < arguments.length; i++)
                    ar = ar.concat(__read(arguments[i]));
                return ar;
            }
            function __spreadArrays() {
                for (var s = 0, i = 0, il = arguments.length; i < il; i++)
                    s += arguments[i].length;
                for (var r = Array(s), k = 0, i = 0; i < il; i++)
                    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                        r[k] = a[j];
                return r;
            }
            ;
            function __await(v) {
                return this instanceof __await ? (this.v = v, this) : new __await(v);
            }
            function __asyncGenerator(thisArg, _arguments, generator) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var g = generator.apply(thisArg, _arguments || []), i, q = [];
                return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
                function verb(n) { if (g[n])
                    i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
                function resume(n, v) { try {
                    step(g[n](v));
                }
                catch (e) {
                    settle(q[0][3], e);
                } }
                function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
                function fulfill(value) { resume("next", value); }
                function reject(value) { resume("throw", value); }
                function settle(f, v) { if (f(v), q.shift(), q.length)
                    resume(q[0][0], q[0][1]); }
            }
            function __asyncDelegator(o) {
                var i, p;
                return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
                function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
            }
            function __asyncValues(o) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var m = o[Symbol.asyncIterator], i;
                return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
                function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
                function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
            }
            function __makeTemplateObject(cooked, raw) {
                if (Object.defineProperty) {
                    Object.defineProperty(cooked, "raw", { value: raw });
                }
                else {
                    cooked.raw = raw;
                }
                return cooked;
            }
            ;
            function __importStar(mod) {
                if (mod && mod.__esModule)
                    return mod;
                var result = {};
                if (mod != null)
                    for (var k in mod)
                        if (Object.hasOwnProperty.call(mod, k))
                            result[k] = mod[k];
                result.default = mod;
                return result;
            }
            function __importDefault(mod) {
                return (mod && mod.__esModule) ? mod : { default: mod };
            }
            /***/ 
        }),
        /***/ "./src/app/app-routing.module.ts": 
        /*!***************************************!*\
          !*** ./src/app/app-routing.module.ts ***!
          \***************************************/
        /*! exports provided: AppRoutingModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () { return AppRoutingModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
            /* harmony import */ var _devices_devices_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./devices/devices.component */ "./src/app/devices/devices.component.ts");
            /* harmony import */ var _devices_admin_admin_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./devices/admin/admin.component */ "./src/app/devices/admin/admin.component.ts");
            var routes = [
                { path: 'admin', component: _devices_admin_admin_component__WEBPACK_IMPORTED_MODULE_4__["AdminComponent"] },
                { path: '**', component: _devices_devices_component__WEBPACK_IMPORTED_MODULE_3__["DevicesComponent"] }
            ];
            var AppRoutingModule = /** @class */ (function () {
                function AppRoutingModule() {
                }
                return AppRoutingModule;
            }());
            AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
                    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
                })
            ], AppRoutingModule);
            /***/ 
        }),
        /***/ "./src/app/app.component.scss": 
        /*!************************************!*\
          !*** ./src/app/app.component.scss ***!
          \************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */");
            /***/ 
        }),
        /***/ "./src/app/app.component.ts": 
        /*!**********************************!*\
          !*** ./src/app/app.component.ts ***!
          \**********************************/
        /*! exports provided: AppComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function () { return AppComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            var AppComponent = /** @class */ (function () {
                function AppComponent() {
                    this.title = 'part4PrinterInfo';
                }
                return AppComponent;
            }());
            AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'app-root',
                    template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
                    styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")).default]
                })
            ], AppComponent);
            /***/ 
        }),
        /***/ "./src/app/app.module.ts": 
        /*!*******************************!*\
          !*** ./src/app/app.module.ts ***!
          \*******************************/
        /*! exports provided: AppModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function () { return AppModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
            /* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
            /* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared/shared.module */ "./src/app/shared/shared.module.ts");
            /* harmony import */ var _devices_devices_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./devices/devices.module */ "./src/app/devices/devices.module.ts");
            /* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
            var AppModule = /** @class */ (function () {
                function AppModule() {
                }
                return AppModule;
            }());
            AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
                    declarations: [
                        _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]
                    ],
                    imports: [
                        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                        _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                        _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"],
                        _devices_devices_module__WEBPACK_IMPORTED_MODULE_6__["DevicesModule"],
                        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"]
                    ],
                    providers: [],
                    bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
                })
            ], AppModule);
            /***/ 
        }),
        /***/ "./src/app/devices/admin/admin.component.scss": 
        /*!****************************************************!*\
          !*** ./src/app/devices/admin/admin.component.scss ***!
          \****************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RldmljZXMvYWRtaW4vYWRtaW4uY29tcG9uZW50LnNjc3MifQ== */");
            /***/ 
        }),
        /***/ "./src/app/devices/admin/admin.component.ts": 
        /*!**************************************************!*\
          !*** ./src/app/devices/admin/admin.component.ts ***!
          \**************************************************/
        /*! exports provided: AdminComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminComponent", function () { return AdminComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
            /* harmony import */ var _shared_services_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/services/api.service */ "./src/app/devices/shared/services/api.service.ts");
            /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
            /* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
            var AdminComponent = /** @class */ (function () {
                function AdminComponent(api, router) {
                    this.api = api;
                    this.router = router;
                    this.isLogIn = false;
                    this.customerControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]();
                    this.customers = [];
                    this.cuid = 0;
                    this.clients = [];
                    this.cid = 0;
                    this.devices = [];
                    this.isDevOn = 1;
                    this.loginForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
                        loginControl: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](''),
                        passControl: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('')
                    });
                    this.companyForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
                        title: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]),
                        desc: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('')
                    });
                    this.clientForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
                        name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])
                    });
                    this.deviceForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
                        productName: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]),
                        url: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]),
                        article: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](''),
                        client_article: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](''),
                        serialNumber: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])
                    });
                }
                AdminComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (localStorage.getItem('logIn') === 'true') {
                        this.isLogIn = true;
                    }
                    this.getCustomer();
                    this.filteredCustomers = this.customerControl.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (value) { return _this._filterCustomer(value); }));
                };
                AdminComponent.prototype._filterCustomer = function (value) {
                    var filterValue = value.toLowerCase();
                    return this.customers.filter(function (option) { return option['title'].toLowerCase().includes(filterValue); });
                };
                AdminComponent.prototype.getCustomer = function () {
                    var _this = this;
                    this.api.getCompany().subscribe(function (result) {
                        _this.customers = result;
                    });
                };
                AdminComponent.prototype.getClient = function () {
                    var _this = this;
                    this.api.getClient(this.cuid).subscribe(function (result) {
                        _this.clients = result;
                    });
                };
                AdminComponent.prototype.getDevices = function () {
                    var _this = this;
                    this.devices = [];
                    this.api.getDevices(this.cuid, this.cid, this.isDevOn).subscribe(function (result) {
                        _this.devices = result;
                        console.log(_this.devices);
                    });
                };
                AdminComponent.prototype.addCompany = function () {
                    var _this = this;
                    var body = {
                        title: this.companyForm.controls['title'].value,
                        desc: this.companyForm.controls['desc'].value
                    };
                    this.api.addCompany(body).subscribe(function (result) {
                        _this.reqCompany = result;
                        if (result['status'] === 'success') {
                            _this.getCustomer();
                        }
                    });
                };
                AdminComponent.prototype.addClient = function () {
                    var _this = this;
                    var body = {
                        name: this.clientForm.controls['name'].value,
                        customers_id: this.cuid
                    };
                    this.api.addClient(body).subscribe(function (result) {
                        console.log(result);
                        _this.reqClient = result;
                        if (result['status'] === 'success') {
                            _this.getClient();
                        }
                    });
                };
                AdminComponent.prototype.addDevice = function () {
                    var _this = this;
                    var body = {
                        productName: this.deviceForm.controls['productName'].value,
                        url: this.deviceForm.controls['url'].value,
                        init_client: this.cid,
                        company_id: this.cuid,
                        article: this.deviceForm.controls['article'].value,
                        client_article: this.deviceForm.controls['client_article'].value,
                        serialNumber: this.deviceForm.controls['serialNumber'].value,
                        enable: 1
                    };
                    this.api.addDevice(body).subscribe(function (result) {
                        console.log(result);
                        _this.reqDevice = result;
                        if (result['status'] === 'success') {
                            _this.getDevices();
                        }
                    });
                };
                AdminComponent.prototype.setCustomer = function (id) {
                    this.cuid = id;
                    this.getClient();
                };
                AdminComponent.prototype.setClient = function (id) {
                    this.cid = id;
                    this.getDevices();
                };
                AdminComponent.prototype.logIn = function () {
                    if (this.loginForm.controls['loginControl'].value === 'admin' && this.loginForm.controls['passControl'].value === 'q1w2e3r4t5y6') {
                        this.isLogIn = true;
                        localStorage.setItem('logIn', 'true');
                    }
                };
                AdminComponent.prototype.go = function (url) {
                    switch (url) {
                        case 'device':
                            this.router.navigate(['/']);
                            break;
                    }
                };
                return AdminComponent;
            }());
            AdminComponent.ctorParameters = function () { return [
                { type: _shared_services_api_service__WEBPACK_IMPORTED_MODULE_3__["APIService"] },
                { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
            ]; };
            AdminComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'app-admin',
                    template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./admin.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/devices/admin/admin.component.html")).default,
                    styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./admin.component.scss */ "./src/app/devices/admin/admin.component.scss")).default]
                })
            ], AdminComponent);
            /***/ 
        }),
        /***/ "./src/app/devices/admin/client/client.component.scss": 
        /*!************************************************************!*\
          !*** ./src/app/devices/admin/client/client.component.scss ***!
          \************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RldmljZXMvYWRtaW4vY2xpZW50L2NsaWVudC5jb21wb25lbnQuc2NzcyJ9 */");
            /***/ 
        }),
        /***/ "./src/app/devices/admin/client/client.component.ts": 
        /*!**********************************************************!*\
          !*** ./src/app/devices/admin/client/client.component.ts ***!
          \**********************************************************/
        /*! exports provided: ClientComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientComponent", function () { return ClientComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            var ClientComponent = /** @class */ (function () {
                function ClientComponent() {
                }
                ClientComponent.prototype.ngOnInit = function () {
                };
                return ClientComponent;
            }());
            ClientComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'app-client',
                    template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./client.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/devices/admin/client/client.component.html")).default,
                    styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./client.component.scss */ "./src/app/devices/admin/client/client.component.scss")).default]
                })
            ], ClientComponent);
            /***/ 
        }),
        /***/ "./src/app/devices/admin/company/company.component.scss": 
        /*!**************************************************************!*\
          !*** ./src/app/devices/admin/company/company.component.scss ***!
          \**************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RldmljZXMvYWRtaW4vY29tcGFueS9jb21wYW55LmNvbXBvbmVudC5zY3NzIn0= */");
            /***/ 
        }),
        /***/ "./src/app/devices/admin/company/company.component.ts": 
        /*!************************************************************!*\
          !*** ./src/app/devices/admin/company/company.component.ts ***!
          \************************************************************/
        /*! exports provided: CompanyComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompanyComponent", function () { return CompanyComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            var CompanyComponent = /** @class */ (function () {
                function CompanyComponent() {
                }
                CompanyComponent.prototype.ngOnInit = function () {
                };
                return CompanyComponent;
            }());
            CompanyComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'app-company',
                    template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./company.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/devices/admin/company/company.component.html")).default,
                    styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./company.component.scss */ "./src/app/devices/admin/company/company.component.scss")).default]
                })
            ], CompanyComponent);
            /***/ 
        }),
        /***/ "./src/app/devices/admin/device/device.component.scss": 
        /*!************************************************************!*\
          !*** ./src/app/devices/admin/device/device.component.scss ***!
          \************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RldmljZXMvYWRtaW4vZGV2aWNlL2RldmljZS5jb21wb25lbnQuc2NzcyJ9 */");
            /***/ 
        }),
        /***/ "./src/app/devices/admin/device/device.component.ts": 
        /*!**********************************************************!*\
          !*** ./src/app/devices/admin/device/device.component.ts ***!
          \**********************************************************/
        /*! exports provided: DeviceComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceComponent", function () { return DeviceComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            var DeviceComponent = /** @class */ (function () {
                function DeviceComponent() {
                }
                DeviceComponent.prototype.ngOnInit = function () {
                };
                return DeviceComponent;
            }());
            DeviceComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'app-device',
                    template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./device.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/devices/admin/device/device.component.html")).default,
                    styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./device.component.scss */ "./src/app/devices/admin/device/device.component.scss")).default]
                })
            ], DeviceComponent);
            /***/ 
        }),
        /***/ "./src/app/devices/admin/manage/manage.component.scss": 
        /*!************************************************************!*\
          !*** ./src/app/devices/admin/manage/manage.component.scss ***!
          \************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RldmljZXMvYWRtaW4vbWFuYWdlL21hbmFnZS5jb21wb25lbnQuc2NzcyJ9 */");
            /***/ 
        }),
        /***/ "./src/app/devices/admin/manage/manage.component.ts": 
        /*!**********************************************************!*\
          !*** ./src/app/devices/admin/manage/manage.component.ts ***!
          \**********************************************************/
        /*! exports provided: ManageComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageComponent", function () { return ManageComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            var ManageComponent = /** @class */ (function () {
                function ManageComponent() {
                }
                ManageComponent.prototype.ngOnInit = function () {
                };
                return ManageComponent;
            }());
            ManageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'app-manage',
                    template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./manage.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/devices/admin/manage/manage.component.html")).default,
                    styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./manage.component.scss */ "./src/app/devices/admin/manage/manage.component.scss")).default]
                })
            ], ManageComponent);
            /***/ 
        }),
        /***/ "./src/app/devices/devices.component.scss": 
        /*!************************************************!*\
          !*** ./src/app/devices/devices.component.scss ***!
          \************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RldmljZXMvZGV2aWNlcy5jb21wb25lbnQuc2NzcyJ9 */");
            /***/ 
        }),
        /***/ "./src/app/devices/devices.component.ts": 
        /*!**********************************************!*\
          !*** ./src/app/devices/devices.component.ts ***!
          \**********************************************/
        /*! exports provided: DevicesComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevicesComponent", function () { return DevicesComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _shared_services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/services/api.service */ "./src/app/devices/shared/services/api.service.ts");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
            /* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
            /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
            var DevicesComponent = /** @class */ (function () {
                function DevicesComponent(api, router, route) {
                    this.api = api;
                    this.router = router;
                    this.route = route;
                    this.customerControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]();
                    this.customers = [];
                    this.cuid = 0;
                    this.clients = [];
                    this.cid = 0;
                    this.infos = [];
                    this.infoUrl = '';
                    this.devices = [];
                    this.initDevices = [];
                    this.dates = [];
                    this.dataLI = 0;
                    this.devLI = 0;
                }
                DevicesComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.getCustomer();
                    this.filteredCustomers = this.customerControl.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (value) { return _this._filterCustomer(value); }));
                };
                DevicesComponent.prototype._filterCustomer = function (value) {
                    var filterValue = value.toLowerCase();
                    return this.customers.filter(function (option) { return option['title'].toLowerCase().includes(filterValue); });
                };
                DevicesComponent.prototype.getCustomer = function () {
                    var _this = this;
                    this.api.getCompany().subscribe(function (result) {
                        _this.customers = result;
                    });
                };
                DevicesComponent.prototype.getClient = function () {
                    var _this = this;
                    this.api.getClient(this.cuid).subscribe(function (result) {
                        _this.clients = result;
                    });
                };
                DevicesComponent.prototype.getDevices = function () {
                    var _this = this;
                    this.devices = [];
                    this.api.getDevices(this.cuid, this.cid, 1).subscribe(function (result) {
                        _this.devices = result;
                        console.log(_this.devices);
                        _this.devices.forEach(function (item) {
                            _this.initDevices.push({
                                productName: item['productname'],
                                url: item['url'],
                                serialNumber: item['sn'],
                                device_id: item['id']
                            });
                        });
                        _this.getQuery = '{"server_init": "getInfo", "init_company":' + _this.cuid + ',"init_client": ' + _this.cid + ',"devices": ' +
                            JSON.stringify(_this.initDevices) + '}';
                        console.log(_this.getQuery);
                    });
                };
                DevicesComponent.prototype.getInfo = function () {
                    var _this = this;
                    this.dates = [];
                    this.api.getInfo(this.devId).subscribe(function (result) {
                        _this.infos = result['content'];
                        console.log(_this.infos);
                        _this.infos.forEach(function (item) {
                            _this.dates.push(item['datetime']);
                        });
                    });
                };
                DevicesComponent.prototype.setCustomer = function (id) {
                    this.cuid = id;
                    this.getClient();
                };
                DevicesComponent.prototype.setClient = function (id) {
                    this.cid = id;
                    this.getDevices();
                };
                DevicesComponent.prototype.setInfo = function (id) {
                    this.devId = id;
                    this.getInfo();
                };
                DevicesComponent.prototype.setDate = function (date) {
                    var _this = this;
                    this.infoDate = date;
                    this.infos.forEach(function (info) {
                        if (info['datetime'] === date) {
                            _this.device = info;
                        }
                    });
                };
                DevicesComponent.prototype.toggleActive = function (i, t) {
                    switch (t) {
                        case 'data':
                            this.dataLI = i;
                            break;
                        case 'dev':
                            this.devLI = i;
                            break;
                    }
                };
                DevicesComponent.prototype.go = function (url) {
                    switch (url) {
                        case 'admin':
                            this.router.navigate(['/admin']);
                            break;
                    }
                };
                return DevicesComponent;
            }());
            DevicesComponent.ctorParameters = function () { return [
                { type: _shared_services_api_service__WEBPACK_IMPORTED_MODULE_2__["APIService"] },
                { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
                { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] }
            ]; };
            DevicesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'app-devices',
                    template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./devices.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/devices/devices.component.html")).default,
                    styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./devices.component.scss */ "./src/app/devices/devices.component.scss")).default]
                })
            ], DevicesComponent);
            /***/ 
        }),
        /***/ "./src/app/devices/devices.module.ts": 
        /*!*******************************************!*\
          !*** ./src/app/devices/devices.module.ts ***!
          \*******************************************/
        /*! exports provided: DevicesModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevicesModule", function () { return DevicesModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _devices_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./devices.component */ "./src/app/devices/devices.component.ts");
            /* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
            var DevicesModule = /** @class */ (function () {
                function DevicesModule() {
                }
                return DevicesModule;
            }());
            DevicesModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    declarations: [_devices_component__WEBPACK_IMPORTED_MODULE_3__["DevicesComponent"]],
                    exports: [
                        _devices_component__WEBPACK_IMPORTED_MODULE_3__["DevicesComponent"]
                    ],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                        _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"]
                    ]
                })
            ], DevicesModule);
            /***/ 
        }),
        /***/ "./src/app/devices/shared/services/api.service.ts": 
        /*!********************************************************!*\
          !*** ./src/app/devices/shared/services/api.service.ts ***!
          \********************************************************/
        /*! exports provided: APIService */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APIService", function () { return APIService; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
            /* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
            var APIService = /** @class */ (function () {
                function APIService(http) {
                    this.http = http;
                    this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL;
                    this.httpOptions = {
                        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({ 'Content-Type': 'application/json' })
                    };
                }
                APIService.prototype.getCompany = function () {
                    return this.http.get(this.url + 'company', this.httpOptions);
                };
                APIService.prototype.getClient = function (cuid) {
                    var param = '?cuid=' + cuid;
                    return this.http.get(this.url + 'client' + param, this.httpOptions);
                };
                APIService.prototype.getDevices = function (cuid, cid, on) {
                    var param = "?cuid=" + cuid + "&cid=" + cid + "&on=" + on;
                    return this.http.get(this.url + 'devices' + param, this.httpOptions);
                };
                APIService.prototype.getInfo = function (id) {
                    var param = '?client=' + id;
                    return this.http.get(this.url + 'info' + param, this.httpOptions);
                };
                APIService.prototype.getErrors = function () {
                    return this.http.get(this.url + 'errors', this.httpOptions);
                };
                APIService.prototype.addCompany = function (body) {
                    return this.http.put(this.url + 'company', body, this.httpOptions);
                };
                APIService.prototype.addClient = function (body) {
                    return this.http.put(this.url + 'client', body, this.httpOptions);
                };
                APIService.prototype.addDevice = function (body) {
                    return this.http.put(this.url + 'device', body, this.httpOptions);
                };
                return APIService;
            }());
            APIService.ctorParameters = function () { return [
                { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
            ]; };
            APIService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
                    providedIn: 'root'
                })
            ], APIService);
            /***/ 
        }),
        /***/ "./src/app/shared/material/material.module.ts": 
        /*!****************************************************!*\
          !*** ./src/app/shared/material/material.module.ts ***!
          \****************************************************/
        /*! exports provided: MaterialModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialModule", function () { return MaterialModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm2015/a11y.js");
            /* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "./node_modules/@angular/cdk/esm2015/drag-drop.js");
            /* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/portal */ "./node_modules/@angular/cdk/esm2015/portal.js");
            /* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/scrolling */ "./node_modules/@angular/cdk/esm2015/scrolling.js");
            /* harmony import */ var _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/stepper */ "./node_modules/@angular/cdk/esm2015/stepper.js");
            /* harmony import */ var _angular_cdk_table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/table */ "./node_modules/@angular/cdk/esm2015/table.js");
            /* harmony import */ var _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/tree */ "./node_modules/@angular/cdk/esm2015/tree.js");
            /* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/esm2015/autocomplete.js");
            /* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/badge */ "./node_modules/@angular/material/esm2015/badge.js");
            /* harmony import */ var _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/bottom-sheet */ "./node_modules/@angular/material/esm2015/bottom-sheet.js");
            /* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm2015/button.js");
            /* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button-toggle */ "./node_modules/@angular/material/esm2015/button-toggle.js");
            /* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm2015/card.js");
            /* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm2015/checkbox.js");
            /* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/chips */ "./node_modules/@angular/material/esm2015/chips.js");
            /* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/stepper */ "./node_modules/@angular/material/esm2015/stepper.js");
            /* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/esm2015/datepicker.js");
            /* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
            /* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/divider */ "./node_modules/@angular/material/esm2015/divider.js");
            /* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/esm2015/expansion.js");
            /* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/grid-list */ "./node_modules/@angular/material/esm2015/grid-list.js");
            /* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm2015/icon.js");
            /* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm2015/input.js");
            /* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/esm2015/list.js");
            /* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/esm2015/menu.js");
            /* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm2015/core.js");
            /* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/esm2015/paginator.js");
            /* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/esm2015/progress-bar.js");
            /* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/esm2015/progress-spinner.js");
            /* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/esm2015/radio.js");
            /* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm2015/select.js");
            /* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/esm2015/sidenav.js");
            /* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/slider */ "./node_modules/@angular/material/esm2015/slider.js");
            /* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/material/slide-toggle */ "./node_modules/@angular/material/esm2015/slide-toggle.js");
            /* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm2015/snack-bar.js");
            /* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/esm2015/sort.js");
            /* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm2015/table.js");
            /* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/esm2015/tabs.js");
            /* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm2015/toolbar.js");
            /* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/esm2015/tooltip.js");
            /* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @angular/material/tree */ "./node_modules/@angular/material/esm2015/tree.js");
            var material = [
                _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__["A11yModule"],
                _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_7__["CdkStepperModule"],
                _angular_cdk_table__WEBPACK_IMPORTED_MODULE_8__["CdkTableModule"],
                _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_9__["CdkTreeModule"],
                _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_4__["DragDropModule"],
                _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_10__["MatAutocompleteModule"],
                _angular_material_badge__WEBPACK_IMPORTED_MODULE_11__["MatBadgeModule"],
                _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_12__["MatBottomSheetModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_13__["MatButtonModule"],
                _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_14__["MatButtonToggleModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_15__["MatCardModule"],
                _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_16__["MatCheckboxModule"],
                _angular_material_chips__WEBPACK_IMPORTED_MODULE_17__["MatChipsModule"],
                _angular_material_stepper__WEBPACK_IMPORTED_MODULE_18__["MatStepperModule"],
                _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_19__["MatDatepickerModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_20__["MatDialogModule"],
                _angular_material_divider__WEBPACK_IMPORTED_MODULE_21__["MatDividerModule"],
                _angular_material_expansion__WEBPACK_IMPORTED_MODULE_22__["MatExpansionModule"],
                _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_23__["MatGridListModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_24__["MatIconModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_25__["MatInputModule"],
                _angular_material_list__WEBPACK_IMPORTED_MODULE_26__["MatListModule"],
                _angular_material_menu__WEBPACK_IMPORTED_MODULE_27__["MatMenuModule"],
                _angular_material_core__WEBPACK_IMPORTED_MODULE_28__["MatNativeDateModule"],
                _angular_material_paginator__WEBPACK_IMPORTED_MODULE_29__["MatPaginatorModule"],
                _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_30__["MatProgressBarModule"],
                _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_31__["MatProgressSpinnerModule"],
                _angular_material_radio__WEBPACK_IMPORTED_MODULE_32__["MatRadioModule"],
                _angular_material_core__WEBPACK_IMPORTED_MODULE_28__["MatRippleModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_33__["MatSelectModule"],
                _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_34__["MatSidenavModule"],
                _angular_material_slider__WEBPACK_IMPORTED_MODULE_35__["MatSliderModule"],
                _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_36__["MatSlideToggleModule"],
                _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_37__["MatSnackBarModule"],
                _angular_material_sort__WEBPACK_IMPORTED_MODULE_38__["MatSortModule"],
                _angular_material_table__WEBPACK_IMPORTED_MODULE_39__["MatTableModule"],
                _angular_material_tabs__WEBPACK_IMPORTED_MODULE_40__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_41__["MatToolbarModule"],
                _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_42__["MatTooltipModule"],
                _angular_material_tree__WEBPACK_IMPORTED_MODULE_43__["MatTreeModule"],
                _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_5__["PortalModule"],
                _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_6__["ScrollingModule"]
            ];
            var MaterialModule = /** @class */ (function () {
                function MaterialModule() {
                }
                return MaterialModule;
            }());
            MaterialModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    declarations: [],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                        material
                    ],
                    exports: [material]
                })
            ], MaterialModule);
            /***/ 
        }),
        /***/ "./src/app/shared/shared.module.ts": 
        /*!*****************************************!*\
          !*** ./src/app/shared/shared.module.ts ***!
          \*****************************************/
        /*! exports provided: SharedModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function () { return SharedModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _material_material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./material/material.module */ "./src/app/shared/material/material.module.ts");
            /* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
            /* harmony import */ var _devices_admin_company_company_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../devices/admin/company/company.component */ "./src/app/devices/admin/company/company.component.ts");
            /* harmony import */ var _devices_admin_client_client_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../devices/admin/client/client.component */ "./src/app/devices/admin/client/client.component.ts");
            /* harmony import */ var _devices_admin_device_device_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../devices/admin/device/device.component */ "./src/app/devices/admin/device/device.component.ts");
            /* harmony import */ var _devices_admin_manage_manage_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../devices/admin/manage/manage.component */ "./src/app/devices/admin/manage/manage.component.ts");
            /* harmony import */ var _devices_admin_admin_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../devices/admin/admin.component */ "./src/app/devices/admin/admin.component.ts");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
            var SharedModule = /** @class */ (function () {
                function SharedModule() {
                }
                return SharedModule;
            }());
            SharedModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    declarations: [_devices_admin_company_company_component__WEBPACK_IMPORTED_MODULE_5__["CompanyComponent"], _devices_admin_client_client_component__WEBPACK_IMPORTED_MODULE_6__["ClientComponent"], _devices_admin_device_device_component__WEBPACK_IMPORTED_MODULE_7__["DeviceComponent"], _devices_admin_manage_manage_component__WEBPACK_IMPORTED_MODULE_8__["ManageComponent"], _devices_admin_admin_component__WEBPACK_IMPORTED_MODULE_9__["AdminComponent"]],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                        _material_material_module__WEBPACK_IMPORTED_MODULE_3__["MaterialModule"],
                        _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ReactiveFormsModule"]
                    ],
                    exports: [
                        _material_material_module__WEBPACK_IMPORTED_MODULE_3__["MaterialModule"],
                        _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"]
                    ]
                })
            ], SharedModule);
            /***/ 
        }),
        /***/ "./src/environments/environment.ts": 
        /*!*****************************************!*\
          !*** ./src/environments/environment.ts ***!
          \*****************************************/
        /*! exports provided: environment */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function () { return environment; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            // This file can be replaced during build by using the `fileReplacements` array.
            // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
            // The list of file replacements can be found in `angular.json`.
            var environment = {
                production: false,
                apiURL: 'http://116.203.243.136:5000/api/'
                /*apiURL: 'http://localhost:5000/api/'*/
            };
            /*
             * For easier debugging in development mode, you can import the following file
             * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
             *
             * This import should be commented out in production mode because it will have a negative impact
             * on performance if an error is thrown.
             */
            // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
            /***/ 
        }),
        /***/ "./src/main.ts": 
        /*!*********************!*\
          !*** ./src/main.ts ***!
          \*********************/
        /*! no exports provided */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
            /* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_1__);
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
            /* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
            /* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
            if (_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].production) {
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["enableProdMode"])();
            }
            Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_4__["AppModule"])
                .catch(function (err) { return console.error(err); });
            /***/ 
        }),
        /***/ 0: 
        /*!***************************!*\
          !*** multi ./src/main.ts ***!
          \***************************/
        /*! no static exports found */
        /***/ (function (module, exports, __webpack_require__) {
            module.exports = __webpack_require__(/*! C:\angular8\russ-group\socket_api\html\part4PrinterInfo\src\main.ts */ "./src/main.ts");
            /***/ 
        })
    }, [[0, "runtime", "vendor"]]]);
//# sourceMappingURL=main-es2015.js.map
//# sourceMappingURL=main-es5.js.map
//# sourceMappingURL=main-es5.js.map