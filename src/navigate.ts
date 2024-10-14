import { $navigateTo, Component } from "nativescript-vue";
import Search from "./views/Search.vue";
import Player from "./views/Player.vue";

interface NativeRoute {
  path: string;
  component: Component;
}

const natives: NativeRoute[] = [
  {
    path: "/search",
    component: Search
  }, {
    path: "/player",
    component: Player
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
  });
}
