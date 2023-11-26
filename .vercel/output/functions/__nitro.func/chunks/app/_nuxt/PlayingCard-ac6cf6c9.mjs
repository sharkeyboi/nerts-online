import __nuxt_component_0 from './Icon-492cc9bd.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';

var Suit = /* @__PURE__ */ ((Suit2) => {
  Suit2[Suit2["Spade"] = 0] = "Spade";
  Suit2[Suit2["Club"] = 1] = "Club";
  Suit2[Suit2["Heart"] = 2] = "Heart";
  Suit2[Suit2["Diamond"] = 3] = "Diamond";
  return Suit2;
})(Suit || {});
const suitIcons = {
  [Suit.Spade]: "bi:suit-spade-fill",
  [Suit.Club]: "bi:suit-club-fill",
  [Suit.Heart]: "bi:suit-heart-fill",
  [Suit.Diamond]: "bi:suit-diamond-fill"
};
const suitColors = {
  [Suit.Spade]: "black",
  [Suit.Club]: "black",
  [Suit.Heart]: "red",
  [Suit.Diamond]: "red"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PlayingCard",
  __ssrInlineRender: true,
  props: {
    card: {},
    draggable: { type: Boolean }
  },
  emits: ["drop", "drag"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: `border-2 border-slate-300 w-24 h-32 bg-slate-200 flex flex-col justify-between ${_ctx.card ? "cursor-pointer" : ""} select-none`,
        draggable: _ctx.draggable ? "true" : "false"
      }, _attrs))}><div class="left-0 top-0 flex flex-col w-6 text-center"><h1>${ssrInterpolate(_ctx.card ? _ctx.card.number : "")}</h1>`);
      _push(ssrRenderComponent(_component_Icon, {
        class: "mx-auto",
        name: unref(suitIcons)[_ctx.card.suit],
        color: unref(suitColors)[_ctx.card.suit]
      }, null, _parent));
      _push(`</div><div class="flex flex-row-reverse"><div class="flex flex-col-reverse w-6 text-center"><h1 class="rotate-180">${ssrInterpolate(_ctx.card ? _ctx.card.number : "")}</h1>`);
      _push(ssrRenderComponent(_component_Icon, {
        class: "rotate-180 mx-auto",
        name: unref(suitIcons)[_ctx.card.suit],
        color: unref(suitColors)[_ctx.card.suit]
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Match/PlayingCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { Suit as S, _sfc_main as _ };
//# sourceMappingURL=PlayingCard-ac6cf6c9.mjs.map
