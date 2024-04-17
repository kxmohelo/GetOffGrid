const Video = () => {
    return (
        <video autoPlay loop muted id="backgroundVideo" className="w-full h-full object-cover">
            <source src="videos/bg-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};

export default Video;