import { React, useState, useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

function ChapterViewer() {
  const [chapterImages, setImages] = useState([]);
  const { ComicTitle } = useParams();
  const [currentIndex, setIndex] = useState(0);
  const startFrom = useLocation().state.startFrom || 1;
  const maxChapter = useLocation().state.endAt;
  const [currentChapter, setcurrentChapter] = useState(startFrom);

  useEffect(() => {
    axios.get(`/comics/${ComicTitle}/${currentChapter}`).then((res) => {
      setImages(res.data.payload.images);
      setIndex(0);
    });
  }, [currentChapter]);

  function SlideLeft(e) {
    e.preventDefault();
    if (currentIndex > 0) {
      setIndex((curIdx) => curIdx - 1);
    } else {
      if (currentChapter - 1 > 0) {
        setcurrentChapter((prevComic) => {
          return prevComic - 1;
        });
      }
    }
    window.scrollTo(0, 0);
  }

  function SlideRight(e) {
    e.preventDefault();
    if (currentIndex < chapterImages.length - 1) {
      setIndex((curIdx) => curIdx + 1);
    } else {
      if (currentChapter + 1 <= maxChapter) {
        setcurrentChapter((prevComic) => {
          return prevComic + 1;
        });
      }
    }
    window.scrollTo(0, 0);
  }

  return (
    <div className="Comic-Controller">
      <img className="ChapterImage" src={process.env.REACT_APP_SERVER_BASE_URL + chapterImages[currentIndex]} alt="" />
      <a className="SlideNav SlideLeft" href="#" onClick={SlideLeft}>
        &larr;
      </a>
      <a className="SlideNav SlideRight" href="#" onClick={SlideRight}>
        &rarr;
      </a>
    </div>
  );
}

export default ChapterViewer;
