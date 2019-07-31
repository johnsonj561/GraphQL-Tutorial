import { useEffect } from 'react';

const useProtectedRoute = props => {
  useEffect(() => {
    if (!props.data.loading && !props.data.user) {
      props.history.replace('/login');
    }
  }, [props]);
};

export default useProtectedRoute;
