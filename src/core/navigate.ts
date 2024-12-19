import { $navigateTo, $navigateBack, Component } from "nativescript-vue"
import home from "../views/home.vue"
import search from "../views/search.vue"
import player from "../views/player.vue"
import imageview from "../views/imgaeview.vue"
import zone from "../views/zone.vue"
import friends from "../views/friends.vue"
import history from "../views/history.vue"
import favorites from "../views/favorites.vue"
import setup from "../views/setup.vue"

interface NativeRoute {
  path: string;
  component: Component;
}

const natives: NativeRoute[] = [
  {
    path: "/search",
    component: search
  }, {
    path: "/player",
    component: player
  }, {
    path: "/imageview",
    component: imageview
  }, {
    path: "/zone",
    component: zone
  }, {
    path: "/friends",
    component: friends
  }, {
    path: "/history",
    component: history
  }, {
    path: "/favorites",
    component: favorites
  }, {
    path: "/setup",
    component: setup
  }
]

export function navigateTo(path: string, props: any = {}) {
  const native = natives.find(n => n.path === path);
  if (!native) {
    console.error(`No component found for path: ${path}`);
    return;
  }
  // 使用类型断言来确保 component 是一个 Component 类型
  $navigateTo(native.component as Component, {
    transition: {
      name: "slideLeft",
      curve: "easeIn"
    },
    props: props
  })
}

export function navigateBack() {
  $navigateBack();
}

export function navigateBackHome() {
  $navigateTo(home, {
    clearHistory: true,
    transition: {
      name: "slideRight",
      curve: "easeIn"
    }
  })
}