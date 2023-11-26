import { _ as _sfc_main$7 } from './PlayingCard-ac6cf6c9.mjs';
import { _ as _sfc_main$8 } from './Button-07058af5.mjs';
import { useSSRContext, defineComponent, mergeProps, ref, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { u as useState } from './state-fc70ca4d.mjs';
import { _ as _export_sfc, n as navigateTo, u as useNuxtApp } from '../server.mjs';
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
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'socket.io-client';

var LocationType = /* @__PURE__ */ ((LocationType2) => {
  LocationType2["River"] = "RIVER";
  LocationType2["Lake"] = "LAKE";
  LocationType2["Stack"] = "STACK";
  LocationType2["Nerts"] = "NERTS";
  return LocationType2;
})(LocationType || {});
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "NertsPile",
  __ssrInlineRender: true,
  props: {
    cards: {},
    draggable: { type: Boolean }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    function dragStartHandler(event, index) {
      const dropAction = {
        cards: props.cards.slice(index),
        fromLocation: {
          locationType: LocationType.Nerts,
          index: 0
        }
      };
      if (event.dataTransfer) {
        event.dataTransfer.setData("text/plain", JSON.stringify(dropAction));
        event.dataTransfer.dropEffect = "move";
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MatchPlayingCard = _sfc_main$7;
      const _component_UtilsButton = _sfc_main$8;
      if (_ctx.cards.length > 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex cursor-pointer select-none" }, _attrs))}>`);
        if (_ctx.cards.length > 0) {
          _push(`<!--[-->`);
          ssrRenderList(_ctx.cards, (card, index) => {
            _push(ssrRenderComponent(_component_MatchPlayingCard, {
              class: "-mr-16",
              style: { "z-index": `${index}` },
              card,
              key: index,
              onDrag: ($event) => dragStartHandler($event, index),
              draggable: _ctx.draggable && index == _ctx.cards.length - 1
            }, null, _parent));
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(_component_UtilsButton, mergeProps({
          label: "NERTS",
          onClick: ($event) => emit("click")
        }, _attrs), null, _parent));
      }
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Match/NertsPile.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Deck",
  __ssrInlineRender: true,
  props: {
    cards: {}
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: `border-4 border-slate-700 w-24 h-32 cursor-pointer select-none ${_ctx.cards.length > 0 ? "bg-slate-500" : ""}`
      }, _attrs))}></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Match/Deck.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Stack",
  __ssrInlineRender: true,
  props: {
    cards: {},
    draggable: { type: Boolean }
  },
  emits: ["clicked"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    function dragStartHandler(event) {
      const dropAction = {
        cards: [props.cards[props.cards.length - 1]],
        fromLocation: {
          locationType: LocationType.Stack,
          index: 0
        }
      };
      if (event.dataTransfer) {
        event.dataTransfer.setData("text/plain", JSON.stringify(dropAction));
        event.dataTransfer.dropEffect = "move";
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MatchPlayingCard = _sfc_main$7;
      if (_ctx.cards.length > 0) {
        _push(ssrRenderComponent(_component_MatchPlayingCard, mergeProps({
          card: _ctx.cards[_ctx.cards.length - 1],
          draggable: _ctx.draggable,
          onDrag: dragStartHandler
        }, _attrs), null, _parent));
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: `border-2 border-slate-300 w-24 h-32 bg-slate-200 flex flex-col justify-between` }, _attrs))}></div>`);
      }
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Match/Stack.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "RiverStack",
  __ssrInlineRender: true,
  props: {
    cards: {},
    index: {},
    draggable: { type: Boolean }
  },
  emits: ["drop"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    function dropHandler(event) {
      var _a;
      const data = (_a = event.dataTransfer) == null ? void 0 : _a.getData("text/plain");
      if (data) {
        const clientDragAction = JSON.parse(data);
        console.log(clientDragAction);
        emit("drop", clientDragAction);
      }
    }
    function dragStartHandler(event, index) {
      const dropAction = {
        cards: props.cards.slice(index),
        fromLocation: {
          locationType: LocationType.River,
          index: props.index
        }
      };
      if (event.dataTransfer) {
        event.dataTransfer.setData("text/plain", JSON.stringify(dropAction));
        event.dataTransfer.dropEffect = "move";
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MatchPlayingCard = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col relative" }, _attrs))}>`);
      if (_ctx.cards.length > 0) {
        _push(`<!--[-->`);
        ssrRenderList(_ctx.cards, (card, index) => {
          _push(ssrRenderComponent(_component_MatchPlayingCard, {
            class: "-mb-24",
            style: { "z-index": `${index}` },
            card,
            key: index,
            onDrag: ($event) => dragStartHandler($event, index),
            onDrop: dropHandler,
            draggable: _ctx.draggable
          }, null, _parent));
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div class="${ssrRenderClass(`border-2 border-slate-300 w-24 h-32 bg-slate-200 flex flex-col justify-between`)}"></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Match/RiverStack.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "LakeStack",
  __ssrInlineRender: true,
  props: {
    cards: {}
  },
  emits: ["drop"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    function dropHandler(event) {
      var _a;
      const data = (_a = event.dataTransfer) == null ? void 0 : _a.getData("text/plain");
      if (data) {
        const clientDragAction = JSON.parse(data);
        console.log(clientDragAction);
        if (clientDragAction.cards.length == 1) {
          emit("drop", clientDragAction);
        }
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MatchPlayingCard = _sfc_main$7;
      if (_ctx.cards.length > 0) {
        _push(ssrRenderComponent(_component_MatchPlayingCard, mergeProps({
          card: _ctx.cards[_ctx.cards.length - 1],
          onDrop: dropHandler,
          draggable: false
        }, _attrs), null, _parent));
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: `border-2 border-slate-300 w-24 h-32 bg-slate-200 flex flex-col justify-between` }, _attrs))}></div>`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Match/LakeStack.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MatchBoard",
  __ssrInlineRender: true,
  setup(__props) {
    const playerNertsPile = ref([]);
    const playerDeck = ref([]);
    const playerStack = ref([]);
    const playerRiver = ref(Array.from(Array(5), () => []));
    const lake = ref(Array.from(Array(8), () => []));
    const opponentNertsPile = ref([]);
    const opponentDeck = ref([]);
    const opponentStack = ref([]);
    const opponentRiver = ref(Array.from(Array(5), () => []));
    const username = useState("username", () => "");
    const { $io } = useNuxtApp();
    $io.auth = {
      username: username.value
    };
    $io.connect();
    $io.on("message", (msg) => {
      console.log(msg);
    });
    $io.on("startGame", (gameBoard) => {
      console.log(gameBoard);
      Object.keys(gameBoard.usersides).forEach((currUser) => {
        const userSide = gameBoard.usersides[currUser];
        if (currUser == username.value) {
          playerNertsPile.value = userSide.nertsPile;
          playerRiver.value = userSide.riverStacks;
          playerDeck.value = userSide.deck;
        } else {
          opponentNertsPile.value = userSide.nertsPile;
          opponentRiver.value = userSide.riverStacks;
          opponentDeck.value = userSide.deck;
        }
      });
    });
    $io.on("matchError", async () => {
      await navigateTo("/");
    });
    $io.on("dropResponse", (dropResponse) => {
      switch (dropResponse.toLocation.locationType) {
        case LocationType.Lake:
          clientHandleLakeDrop(dropResponse);
          break;
        case LocationType.River:
          clientHandleRiverDrop(dropResponse);
          break;
      }
      switch (dropResponse.fromLocation.locationType) {
        case LocationType.River:
          clientRemoveFromRiver(dropResponse);
          break;
        case LocationType.Nerts:
          clientRemoveFromNerts(dropResponse);
        case LocationType.Stack:
          clientRemoveFromStack(dropResponse);
      }
    });
    $io.on("dealResponse", (user) => {
      clientDeal(user);
    });
    $io.on("reshuffleResponse", (resp) => {
      if (resp.userId == username.value) {
        playerDeck.value = resp.cards;
        playerStack.value = [];
      } else {
        opponentDeck.value = resp.cards;
        opponentStack.value = [];
      }
    });
    function clientHandleRiverDrop(dropResponse) {
      const river = username.value == dropResponse.userId ? playerRiver.value : opponentRiver.value;
      const dropTo = river[dropResponse.toLocation.index];
      dropResponse.cards.forEach((card) => {
        dropTo.push(card);
      });
    }
    function clientRemoveFromRiver(dropResponse) {
      let river = username.value == dropResponse.userId ? playerRiver.value : opponentRiver.value;
      let riverPile = river[dropResponse.fromLocation.index];
      dropResponse.cards.forEach((card) => {
        riverPile.splice(riverPile.indexOf(card), 1);
      });
    }
    function clientRemoveFromNerts(dropResponse) {
      let nertsPile = username.value == dropResponse.userId ? playerNertsPile.value : opponentNertsPile.value;
      dropResponse.cards.forEach((card) => {
        nertsPile.splice(nertsPile.indexOf(card), 1);
      });
    }
    function clientRemoveFromStack(dropResponse) {
      let stack = username.value == dropResponse.userId ? playerStack.value : opponentStack.value;
      dropResponse.cards.forEach((card) => {
        stack.splice(stack.indexOf(card), 1);
      });
    }
    function clientHandleLakeDrop(dropResponse) {
      dropResponse.cards.forEach((card) => {
        lake.value[dropResponse.toLocation.index].push(card);
      });
    }
    function serverHandleRiverDrop(clientDragAction, index) {
      console.log("DROPPING", clientDragAction);
      $io.emit("dropAction", {
        userId: username.value,
        cards: clientDragAction.cards,
        toLocation: {
          locationType: LocationType.River,
          index
        },
        fromLocation: clientDragAction.fromLocation
      });
    }
    function serverHandleLakeDrop(clientDragAction, index) {
      $io.emit("dropAction", {
        userId: username.value,
        cards: clientDragAction.cards,
        toLocation: {
          locationType: LocationType.Lake,
          index
        },
        fromLocation: clientDragAction.fromLocation
      });
    }
    function serverDeal() {
      $io.emit("dealAction");
    }
    function clientDeal(user) {
      if (user == username.value) {
        const dealtCards = playerDeck.value.slice(0, 3);
        const remainingCards = playerDeck.value.slice(dealtCards.length);
        playerDeck.value = remainingCards;
        playerStack.value = playerStack.value.concat(dealtCards);
      } else {
        const dealtCards = opponentDeck.value.slice(0, 3);
        const remainingCards = opponentDeck.value.slice(dealtCards.length);
        opponentDeck.value = remainingCards;
        opponentStack.value = opponentStack.value.concat(dealtCards);
      }
    }
    function serverHandleNerts() {
      $io.emit("nertsAction");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MatchNertsPile = _sfc_main$6;
      const _component_MatchDeck = _sfc_main$5;
      const _component_MatchStack = _sfc_main$4;
      const _component_MatchRiverStack = _sfc_main$3;
      const _component_MatchLakeStack = _sfc_main$2;
      _push(`<!--[-->${ssrInterpolate(unref(username))} <div class="flex flex-col justify-evenly h-full w-10/12"><div class="rotate-180 flex justify-evenly">`);
      _push(ssrRenderComponent(_component_MatchNertsPile, {
        draggable: false,
        cards: unref(opponentNertsPile)
      }, null, _parent));
      _push(`<div class="flex justify-between">`);
      _push(ssrRenderComponent(_component_MatchDeck, {
        class: "mx-4",
        cards: unref(opponentDeck)
      }, null, _parent));
      _push(ssrRenderComponent(_component_MatchStack, {
        draggable: false,
        cards: unref(opponentStack)
      }, null, _parent));
      _push(`</div><!--[-->`);
      ssrRenderList(unref(opponentRiver), (cards, index) => {
        _push(ssrRenderComponent(_component_MatchRiverStack, {
          draggable: false,
          cards,
          key: index,
          index
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="flex justify-center"><!--[-->`);
      ssrRenderList(unref(lake), (cards, index) => {
        _push(ssrRenderComponent(_component_MatchLakeStack, {
          onDrop: ($event) => serverHandleLakeDrop($event, index),
          class: "mx-4",
          cards,
          key: index
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="flex justify-evenly">`);
      _push(ssrRenderComponent(_component_MatchNertsPile, {
        onClick: serverHandleNerts,
        draggable: true,
        cards: unref(playerNertsPile)
      }, null, _parent));
      _push(`<div class="flex justify-between">`);
      _push(ssrRenderComponent(_component_MatchDeck, {
        class: "mx-4",
        cards: unref(playerDeck),
        onClick: serverDeal
      }, null, _parent));
      _push(ssrRenderComponent(_component_MatchStack, {
        draggable: true,
        cards: unref(playerStack)
      }, null, _parent));
      _push(`</div><!--[-->`);
      ssrRenderList(unref(playerRiver), (cards, index) => {
        _push(ssrRenderComponent(_component_MatchRiverStack, {
          draggable: true,
          onDrop: ($event) => serverHandleRiverDrop($event, index),
          cards,
          key: index,
          index
        }, null, _parent));
      });
      _push(`<!--]--></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Match/MatchBoard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_MatchBoard = _sfc_main$1;
  _push(ssrRenderComponent(_component_MatchBoard, _attrs, null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Match.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Match = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { Match as default };
//# sourceMappingURL=Match-098e4833.mjs.map
