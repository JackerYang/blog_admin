import Editor from "mavon-editor"
import "mavon-editor/dist/css/index.css"

export default {
    install: Vue => {
        Vue.use(Editor)
    }
}