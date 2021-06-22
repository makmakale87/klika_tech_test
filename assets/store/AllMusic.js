import {makeAutoObservable} from 'mobx';

class AllMusic {
    music = [];
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setMusicList(list) {
        this.music = list;
        localStorage.setItem('AllMusic', JSON.stringify(list));
        this.loading = false;
    }

    getMusicList(){
        const ls = localStorage.getItem('AllMusic');
        return ls ? JSON.parse(ls) : undefined;
    }

    toggleLoading(){
        this.loading = !this.loading;
    }
}

export default new AllMusic();