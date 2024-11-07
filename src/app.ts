import { createApp, registerElement } from 'nativescript-vue';
import App from './app.vue';

const app = createApp(App);
app.start();

import { initialize, Img } from "@nativescript-community/ui-image";
initialize({ isDownsampleEnabled: true });
registerElement('Img', () => Img);

import { Video } from 'nativescript-videoplayer';
registerElement('VideoPlayer', () => Video);

import { Pager, PagerItem } from '@nativescript-community/ui-pager';
registerElement('Pager', () => Pager);
registerElement('PagerItem', () => PagerItem);

import DrawerPlugin from '@nativescript-community/ui-drawer/vue3'
app.use(DrawerPlugin)


