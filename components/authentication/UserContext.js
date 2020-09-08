import React from "react";
import PropTypes from "prop-types";

export const UserContext = React.createContext({
  userInfo: {},
});

const UserConsumer = UserContext.Consumer;

const ProfileProvider = ({ children, userInfo }) => (
  <UserContext.Provider value={{ userInfo }}>{children}</UserContext.Provider>
);

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
  userInfo: PropTypes.shape({}).isRequired,
};

export { UserConsumer };
export default ProfileProvider;
