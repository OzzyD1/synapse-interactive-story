class VideoPreloader {
    constructor() {
        this.cache = new Map();
    }

    preload(src) {
        if (this.cache.has(src)) {
            return this.cache.get(src);
        }

        const video = document.createElement("video");
        video.src = src;
        video.preload = "auto";

        const promise = new Promise((resolve, reject) => {
            video.onloadeddata = () => resolve(video);
            video.onerror = reject;
        });

        this.cache.set(src, promise);
        return promise;
    }

    preloadMultiple(sources) {
        return Promise.all(sources.map((src) => this.preload(src)));
    }
}

export const preloader = new VideoPreloader();
