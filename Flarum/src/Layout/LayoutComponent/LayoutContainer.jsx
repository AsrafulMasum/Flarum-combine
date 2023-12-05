import PropTypes from 'prop-types';

const LayoutContainer = ({children}) => {
  return (
    <div className="max-w-screen-lg mx-4 xl:mx-auto">
      {children}
    </div>
  );
};

export default LayoutContainer;

LayoutContainer.propTypes = {
  children: PropTypes.node
}