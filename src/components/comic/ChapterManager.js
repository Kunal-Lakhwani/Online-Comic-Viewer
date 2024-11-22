import React from "react";
import ChaptersDisplay from "./ChaptersDisplay";

function ChapterManager() {
  return (
    <React.Fragment>
      <ChapterUpload></ChapterUpload>
      <ChaptersDisplay showDelBtn={true}></ChaptersDisplay>;
    </React.Fragment>
  );
}

export default ChapterManager;
