import { useState, useEffect } from "react";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const isMediaMatches = media.matches;
    if (isMediaMatches !== matches) {
      setMatches(isMediaMatches);
    }

    function resizeListener() {
      setMatches(isMediaMatches);
    }

    window.addEventListener("resize", resizeListener);

    return () => window.removeEventListener("resize", resizeListener);
  }, [matches, query]);

  return matches;
}

export default useMediaQuery;
