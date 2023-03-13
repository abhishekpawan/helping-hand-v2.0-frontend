import PropTypes from "prop-types";
import { FC } from "react";
const LocatorButton: FC<{ mapObject: any }> = ({ mapObject }) => {
  return <button type="button">locate</button>;
};
LocatorButton.propTypes = {
  mapObject: PropTypes.object,
};
export default LocatorButton;
