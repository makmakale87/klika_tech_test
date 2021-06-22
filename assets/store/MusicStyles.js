import {makeAutoObservable} from 'mobx';

class MusicStyles {
    styles = [];

    constructor() {
        makeAutoObservable(this);
    }

    setMusicStyles(list) {
        this.styles = list;
    }
}

export default new MusicStyles();