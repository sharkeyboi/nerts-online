import { useSSRContext } from 'vue';
import { _ as _export_sfc } from '../server.mjs';
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
import 'vue/server-renderer';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(` Stats `);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Stats.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Stats = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { Stats as default };
//# sourceMappingURL=Stats-6878ecce.mjs.map
