export default class PreloadScene {
    constructor(document) {
        this._loading = document.getElementById('loading');
        this._saveStyle();
    }

    _saveStyle() {
        this._old_style = this._loading.style.display;
    }

    hideLoading() {
        this._saveStyle();
        this._loading.style.display = "none";
    }

    showLoading() {
        this._loading.style.display = this._old_style;
    }

}
