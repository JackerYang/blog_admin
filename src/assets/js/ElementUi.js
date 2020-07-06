import {
    Button,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Table,
    TableColumn,
    Pagination,
    Input,
    Dialog,
    Form,
    FormItem,
    Upload,
    Select,
    Option,
    Loading,
    Message,
    MessageBox
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

        Vue.use(Loading)

        Vue.prototype.$confirm = MessageBox.confirm
        Vue.prototype.$message = Message
    }
}


export default ElementUi
