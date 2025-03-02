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

    async preloadVideo(url, onProgress) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to load video: ${url}`);

            const blob = await response.blob();
            const videoUrl = URL.createObjectURL(blob);

            const video = document.createElement("video");
            video.src = videoUrl;

            return new Promise((resolve) => {
                video.addEventListener("loadeddata", () => {
                    this.preloadedVideos.set(url, video);
                    this.loadedVideos++;
                    onProgress(this.loadedVideos / this.totalVideos);
                    resolve();
                });

                video.addEventListener("error", (e) => {
                    console.error(`Error loading video ${url}:`, e);
                    this.loadedVideos++;
                    onProgress(this.loadedVideos / this.totalVideos);
                    resolve();
                });
            });
        } catch (error) {
            console.error(`Failed to preload video ${url}:`, error);
            this.loadedVideos++;
            onProgress(this.loadedVideos / this.totalVideos);
            return Promise.resolve(); // Continue loading other videos
        }
    }

    getPreloadedVideo(url) {
        return this.preloadedVideos.get(url);
    }
}

export default VideoPreloader;
