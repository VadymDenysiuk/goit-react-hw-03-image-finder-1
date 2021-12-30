const ImageGalleryItem = ({ url, onOpen, getLargeImage, largeImageURL }) => {
  const onImageOpen = () => {
    getLargeImage(largeImageURL);
    onOpen();
  };
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={url}
        alt="wow"
        loading="lazy"
        onClick={onImageOpen}
      />
    </li>
  );
};

export default ImageGalleryItem;
