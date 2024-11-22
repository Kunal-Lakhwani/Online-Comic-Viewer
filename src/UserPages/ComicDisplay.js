import React, { useContext } from "react";
import Comic from "../components/comic/Comic";
import { GlobalContext } from "../App";

export default function ComicArea() {
  let [Global, setGlobal] = useContext(GlobalContext);

  return (
    <React.Fragment>
      {Global.comicsLst.map((comic, idx) => {
        if (comic.Chapters.length > 0) {
          return (
            <Comic
              key={idx}
              title={comic.Title}
              characters={comic.Characters}
              chapters={comic.Chapters}
              updatedOn={comic.UpdatedAt}
              createdOn={comic.CreatedAt}
              status={comic.Status}
            />
          );
        }
      })}
    </React.Fragment>
  );
}
