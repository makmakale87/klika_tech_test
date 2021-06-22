import {makeAutoObservable} from 'mobx';

class AllMusic {
    music = [];
    loading = true;

    constructor() {
        makeAutoObservable(this);
    }

    setMusicList(list) {
        this.music = list;
        this.loading = false;
    }
}

export default new AllMusic();