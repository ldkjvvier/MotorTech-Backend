"use strict";
(self["webpackChunkmotor_tech_back_end"] = self["webpackChunkmotor_tech_back_end"] || []).push([[6090],{

/***/ 72364:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27279);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27997);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(73354);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27875);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(93415);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6191);
/* harmony import */ var _strapi_design_system_v2__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(37370);
/* harmony import */ var _strapi_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6162);
/* harmony import */ var _strapi_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(48157);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61020);





const SalesPage = () => {
  const { formatMessage } = (0,react_intl__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)();
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_design_system__WEBPACK_IMPORTED_MODULE_2__/* .Layout */ .A, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_design_system__WEBPACK_IMPORTED_MODULE_3__/* .Main */ .o, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    _strapi_design_system__WEBPACK_IMPORTED_MODULE_4__/* .HeaderLayout */ .T,
    {
      title: formatMessage({ id: "global.auditLogs", defaultMessage: "Audit Logs" }),
      subtitle: formatMessage({
        id: "Settings.permissions.auditLogs.listview.header.subtitle",
        defaultMessage: "Logs of all the activities that happened in your environment"
      })
    }
  ), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_design_system__WEBPACK_IMPORTED_MODULE_5__/* .Box */ .x, { paddingLeft: 10, paddingRight: 10 }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    _strapi_design_system__WEBPACK_IMPORTED_MODULE_6__/* .EmptyStateLayout */ .x,
    {
      icon: /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_icons__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, { width: "10rem" }),
      content: formatMessage({
        id: "Settings.permissions.auditLogs.not-available",
        defaultMessage: "Audit Logs is only available as part of the Enterprise Edition. Upgrade to get a searchable and filterable display of all activities."
      }),
      action: /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
        _strapi_design_system_v2__WEBPACK_IMPORTED_MODULE_8__/* .LinkButton */ .Q,
        {
          variant: "default",
          endIcon: /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_icons__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, null),
          href: "https://strp.cc/45mbAdF",
          isExternal: true,
          target: "_blank"
        },
        formatMessage({
          id: "global.learn-more",
          defaultMessage: "Learn more"
        })
      )
    }
  ))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SalesPage);


/***/ })

}]);