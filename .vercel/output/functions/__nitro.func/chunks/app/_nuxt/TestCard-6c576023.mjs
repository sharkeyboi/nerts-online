import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1, S as Suit } from './PlayingCard-ac6cf6c9.mjs';
import './Icon-492cc9bd.mjs';
import './index-34b718f2.mjs';
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
import '../server.mjs';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'socket.io-client';
import './state-fc70ca4d.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TestCard",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        draggable: true,
        card: {
          suit: unref(Suit).Spade,
          number: "A"
        }
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/TestCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=TestCard-6c576023.mjs.map
