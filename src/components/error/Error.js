import PropTypes from 'prop-types';

const Error = ({ errorMsg }) => {
  return <div>{errorMsg}</div>;
};

Error.propTypes = {
  errorMsg: PropTypes.string.isRequired,
};

export default Error;
