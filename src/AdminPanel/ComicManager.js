import React from "react";
import ChapterUpload from "../components/comic/ChapterUpload";
import NewComic from "../components/comic/NewComic";
import ChaptersDisplay from "../components/comic/ChaptersDisplay";

function ComicManager() {
  return (
    <React.Fragment>
      <NewComic></NewComic>
      <ChaptersDisplay showDelBtn="true"></ChaptersDisplay>
    </React.Fragment>
  );
}

export default ComicManager;
