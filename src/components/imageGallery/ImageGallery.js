import PropTypes from "prop-types";
import ImageGalleryItem from "../imageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ items, onOpen, getItemId }) => {
  return (
    <ul className="ImageGallery">
      {items.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          url={webformatURL}
          onOpen={onOpen}
          getItemId={getItemId}
          id={id}
          tags={tags}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array,
  onOpen: PropTypes.func,
  getItemId: PropTypes.func,
};

export default ImageGallery;
