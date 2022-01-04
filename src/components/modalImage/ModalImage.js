const ModalImage = ({ data }) => {
  const { largeImageURL, tags } = data;
  return <img src={largeImageURL} alt={tags} />;
};

export default ModalImage;
