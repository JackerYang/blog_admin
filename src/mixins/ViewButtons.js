import { mapState } from "vuex"

export default {
    computed: {
        ...mapState({
            btnMap: state => state.app.btnMap
        }),

        btnList() {
            return this.signs.map(sign => {
                return {
                    ...this.btnMap[sign],
                    fn: this[sign]
                }
            })
        }
    }
}