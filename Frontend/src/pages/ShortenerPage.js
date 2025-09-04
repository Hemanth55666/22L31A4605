import React, { useState } from "react";
import UrlForm from "../components/UrlForm";
import UrlList from "../components/UrlList";

const ShortenerPage = () => {
  const [urls, setUrls] = useState([]);

  const handleShorten = (newUrl) => {
    setUrls((prev) => [...prev, newUrl]);
  };

  return (
    <>
      <h2>Create Short URL</h2>
      <UrlForm onShorten={handleShorten} />
      <UrlList urls={urls} />
    </>
  );
};

export default ShortenerPage;
