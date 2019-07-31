import { useEffect } from 'react';

const useLoginRedirect = props => {
  useEffect(() => {
    if (props.data.user) {
      console.log('Hook running');
      props.history.replace('/');
    }
  }, [props.data.user]);
};

export default useLoginRedirect;
