import { useEffect } from "react";

const useScript = (url) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;
    script.type = "text/javascript";

    // change this to body later
    document.body.appendChild(script);
    // script.onload = () => {
    //   console.log(`${script} loaded`);
    // };

    return () => {
      // change this to body later
      document.body.removeChild(script);
    };
  }, [url]);
};

export default useScript;
