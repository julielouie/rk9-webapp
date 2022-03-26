import React from 'react';
import { Redirect } from 'react-router-dom';

const IndexRedirect: React.FC = () => {
  return <Redirect to="/home" />;
};
export default IndexRedirect;
