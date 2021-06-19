
export default class Evidence {
    constructor(
        name,
        selected
    ) {
        this.name = name
        this.selected = selected
    }

    toggle = function() {
        this.selected = !this.selected
    }
}
