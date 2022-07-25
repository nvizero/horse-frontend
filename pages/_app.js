import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {store, wrapper} from '../store'
const WrappedApp = ({ Component, pageProps:{...pageProps}   }) => {
  
  
  return (    
      <>                 
        <Component {...pageProps} />
      </>
    
  );
};

// export default MyApp
export default wrapper.withRedux(WrappedApp)