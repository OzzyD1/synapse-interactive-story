class VideoPreloader {
    constructor(videoUrls) {
        this.videoUrls = videoUrls;
        this.preloadedVideos = new Map();
        this.totalVideos = videoUrls.length;
        this.loadedVideos = 0;
    }

    preloadVideos(onProgress) {
        return Promise.all(
            this.videoUrls.map((url) => this.preloadVideo(url, onProgress))
        );
    }

    preloadVideo(url, onProgress) {
        return new Promise((resolve) => {
            const video = document.createElement("video");
            video.src = url;
            video.preload = "auto";

            video.addEventListener("loadeddata", () => {
                this.preloadedVideos.set(url, video);
                this.loadedVideos++;
                onProgress(this.loadedVideos / this.totalVideos);
                resolve();
            });
        });
    }

    getPreloadedVideo(url) {
        return this.preloadedVideos.get(url);
    }
}

export default VideoPreloader;
