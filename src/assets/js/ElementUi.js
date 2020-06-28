import { Button, Menu, Submenu, MenuItem, MenuItemGroup } from "element-ui";

const ElementUi = {
    install: Vue => {
        Vue.use(Button);
        Vue.use(Menu);
        Vue.use(Submenu);
        Vue.use(MenuItem);
        Vue.use(MenuItemGroup);
    }
};

export default ElementUi;
