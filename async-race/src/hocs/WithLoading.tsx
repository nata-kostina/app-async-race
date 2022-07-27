import React from 'react';

interface WithLoadingProps {
  isLoading: boolean,
}
// eslint-disable-next-line max-len
function WithLoading(Component: React.FunctionComponent) {
  return function WithLoadingComponent({ isLoading, ...props }: WithLoadingProps) {
    if (!isLoading) return <Component {...props} />;
    return 'Still fetching data ...';
  };
}

export default WithLoading;
