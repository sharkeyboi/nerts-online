import { defineComponent, withCtx, unref, createTextVNode, createVNode, withDirectives, isRef, vModelText, useSSRContext, mergeProps } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-4756058e.mjs';
import { _ as _sfc_main$2 } from './Button-07058af5.mjs';
import { u as useState } from './state-fc70ca4d.mjs';
import '../../entry.mjs';
import 'socket.io';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'crypto';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'socket.io-client';

const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-slate-50 rounded-md shadow-md text-center p-2 max-h-40" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Utils/Card.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const username = useState("username", () => "");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UtilsCard = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UtilsButton = _sfc_main$2;
      _push(ssrRenderComponent(_component_UtilsCard, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-center tracking-tight text-4xl mb-8 text-slate-600"${_scopeId}>Nerts Online</h1><input${ssrRenderAttr("value", unref(username))} class="m-4 p-1 h-8 border-b-2 border-slate-200 placeholder-slate-300 outline-primary-200 text-slate-600 focus:outline-none" placeholder="Enter name"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/Match",
              class: "m-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UtilsButton, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Find Match`);
                      } else {
                        return [
                          createTextVNode("Find Match")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UtilsButton, null, {
                      default: withCtx(() => [
                        createTextVNode("Find Match")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h1", { class: "text-center tracking-tight text-4xl mb-8 text-slate-600" }, "Nerts Online"),
              withDirectives(createVNode("input", {
                "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                class: "m-4 p-1 h-8 border-b-2 border-slate-200 placeholder-slate-300 outline-primary-200 text-slate-600 focus:outline-none",
                placeholder: "Enter name"
              }, null, 8, ["onUpdate:modelValue"]), [
                [vModelText, unref(username)]
              ]),
              createVNode(_component_NuxtLink, {
                to: "/Match",
                class: "m-4"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UtilsButton, null, {
                    default: withCtx(() => [
                      createTextVNode("Find Match")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-b107f771.mjs.map
