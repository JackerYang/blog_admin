import {
    Avatar,
    Button,
    Card,
    Dialog,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Form,
    FormItem,
    Input,
    Loading,
    Menu,
    MenuItem,
    MenuItemGroup,
    Message,
    MessageBox,
    Option,
    Pagination,
    Select,
    Submenu,
    Table,
    TableColumn,
    Upload
} from "element-ui"

const ElementUi = {
    install: Vue => {
        Vue.use(Button)
        Vue.use(Menu)
        Vue.use(Submenu)
        Vue.use(MenuItem)
        Vue.use(MenuItemGroup)
        Vue.use(Table)
        Vue.use(TableColumn)
        Vue.use(Pagination)
        Vue.use(Input)
        Vue.use(Dialog)
        Vue.use(Form)
        Vue.use(FormItem)
        Vue.use(Upload)
        Vue.use(Select)
        Vue.use(Option)
        Vue.use(Card)
        Vue.use(Avatar)
        Vue.use(Dropdown)
        Vue.use(DropdownMenu)
        Vue.use(DropdownItem)

        Vue.use(Loading)

        Vue.prototype.$confirm = MessageBox.confirm
        Vue.prototype.$message = Message
    }
}


export default ElementUi
