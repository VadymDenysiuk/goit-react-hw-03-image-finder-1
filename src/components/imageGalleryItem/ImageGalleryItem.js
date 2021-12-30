const ImageGalleryItem = ({ url }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={url}
        alt="wow"
        loading="lazy"
      />
    </li>
  );
};

export default ImageGalleryItem;
