import { useEffect } from "react";

const useScript = (url) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;

    document.body.appendChild(script);
    console.log("Script added");

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default useScript;
