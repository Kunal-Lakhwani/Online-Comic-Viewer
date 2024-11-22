import Delbtn from "../General/Delbtn";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function formatDate(dte) {
  return new Date(dte).toLocaleTimeString([], { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function ChaptersDisplay({ showDelBtn = true, selectedComic = undefined }) {
  const location = useLocation();
  const NavigateTo = useNavigate();
  const comic = location.state || selectedComic;
  // const [thumbLst, setThumbnails] = useState([]);

  // useEffect(() => {
  //   // axios({
  //   //   method: "get",
  //   //   url: `/comics/${comic.title}/1`,
  //   //   data: { chapterID: comic.chapters[0] },
  //   // }).then((result) => {
  //   //   console.log(result);
  //   // });
  //   console.log(comic);
  //   axios({
  //     method: "get",
  //     url: "/comics/ChapterThumbnails",
  //     data: { chapterslst: comic.chapters },
  //   }).then((result) => {
  //     setThumbnails(result.thumbnails);
  //   });
  // }, []);

  try {
    const chaptersAmt = comic.chapters.length;
    return (
      <React.Fragment>
        <div className="ChaptersDisplayContainer">
          <div className="Comic-Title">{comic.title}</div>
          <div className="ComicCharaList">
            <label>Characters in this Comic:</label>
            {comic.characters.map((chara, idx) => {
              return <span key={idx}>{chara}</span>;
            })}
          </div>
          <div className="Chapter-List">
            {comic.chapters.map((chapter, idx) => {
              return (
                <div key={chapter}>
                  <span className="ChNumDisplay">#{idx + 1}</span>
                  <div className="Control-Box">
                    <NavLink className={"LinkBtn"} to={`./Read`} state={{ startedFrom: idx + 1, endAt: chaptersAmt }}>
                      Read
                    </NavLink>
                    {showDelBtn ? <DelBtn /> : ""}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  } catch (error) {
    if (!comic && showDelBtn === false) {
      NavigateTo("/404");
    } else {
      return <React.Fragment></React.Fragment>;
    }
  }
}

export default ChaptersDisplay;
