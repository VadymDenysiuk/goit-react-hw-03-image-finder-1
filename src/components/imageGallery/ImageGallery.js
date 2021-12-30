import ImageGalleryItem from "../imageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ items, onOpen, getLargeImage }) => {
  return (
    <ul className="ImageGallery">
      {items.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          url={webformatURL}
          onOpen={onOpen}
          getLargeImage={getLargeImage}
          largeImageURL={largeImageURL}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
