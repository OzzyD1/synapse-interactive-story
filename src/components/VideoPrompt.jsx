import PropTypes from 'prop-types';

const VideoPrompt = ({ videos, onVideoSelect }) => {
  return (
    <div className="video-prompt">
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {videos.map(video => (
          <li key={video.id} style={{ margin: '10px 0' }}>
            <button 
              onClick={() => onVideoSelect(video.src)}
              style={{
                padding: '10px 20px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              {video.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

VideoPrompt.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired
    })
  ).isRequired,
  onVideoSelect: PropTypes.func.isRequired
};

export default VideoPrompt;