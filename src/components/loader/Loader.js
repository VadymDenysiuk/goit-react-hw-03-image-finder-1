import Spinner from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderContainer>
      <Spinner type="Oval" color="#00BFFF" height={40} width={40} />
    </LoaderContainer>
  );
};

export default Loader;
