import { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function formatDate(dte) {
  return new Date(dte).toLocaleTimeString([], { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

const comic = (props) => {
  const { title, characters, chapters, updatedOn, createdOn, status } = props;
  const chapterCount = chapters.length;
  return (
    <div className="ComicInfo">
      <span className="Comic-Title">{title}</span>
      <span className="Comic-Charas">
        Characters: <span className="Character-List">{characters.join(", ")}</span>
      </span>
      <span className="Comic-ChapterCount">Chapters: {chapterCount}</span>
      <span className="Comic-Updated">Created At: {formatDate(updatedOn)}</span>
      <span className="Comic-Created">Last Updated At: {formatDate(createdOn)}</span>
      <span className="Comic-Status">
        <span className="Status-Lbl" data-status={status}>
          {status}
        </span>
      </span>
      <span className="Comic-Links">
        <NavLink to={`./${title}`} state={props} className="ViewChaptersBtn">
          View Chapters
        </NavLink>
        <NavLink to={`./${title}/Read`} state={{ startFrom: 1, endAt: chapterCount }} className="ReadAllBtn">
          Read All from start
        </NavLink>
      </span>
    </div>
  );
};

export default comic;
