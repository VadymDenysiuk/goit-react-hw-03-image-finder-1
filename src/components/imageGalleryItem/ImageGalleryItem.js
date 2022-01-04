import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  url,
  largeImageURL,
  onOpen,
  getItemId,
  tags,
  id,
}) => {
  const onImageOpen = () => {
    getItemId({ largeImageURL, tags });
    onOpen();
  };
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={url}
        alt={tags || 'wonderfull photo'}
        loading="lazy"
        onClick={onImageOpen}
        id={id}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
  getItemId: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  tags: PropTypes.string,
};

export default ImageGalleryItem;
