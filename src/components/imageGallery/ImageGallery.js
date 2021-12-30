import ImageGalleryItem from "../imageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ items }) => {
  return (
    <ul className="ImageGallery">
      {items.map((item) => (
        <ImageGalleryItem key={item} url={item} />
      ))}
    </ul>
  );
};

export default ImageGallery;
