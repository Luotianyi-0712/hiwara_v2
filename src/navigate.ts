import { $navigateTo } from "nativescript-vue";

import Search from "./views/Search.vue";
import Player from "./views/Player.vue";

const natives = [
  {
    path: "/search",
    component: Search
  }, {
    path: "/player",
    component: Player
  }
]

export function navigateTo(path: string, props: any = {}) {
  $navigateTo(natives.find(n => n.path == path)!.component, {
    transition: {
      name: "slideLeft",
      curve: "easeIn"
    },
    props: props
  });
}