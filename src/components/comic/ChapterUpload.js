import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../App";
import axios from "axios";

function ChapterUpload() {
  const [Global, setGlobal] = useContext(GlobalContext);
  const [selectedComicData, selectComic] = useState({});
  const [fileData, setFiles] = useState(null);
  const [imgArr, setImages] = useState([]);
  const detailsRef = useRef(null);
  const filesRef = useRef(null);
  const selectRef = useRef(null);

  function titleHandler(e) {
    if (e.target.value > -1) {
      const comicData = Global.comicsLst[e.target.value];
      selectComic({ comicTitle: comicData.Title, chapterCount: comicData.Chapters.length, arrIdx: e.target.value });
      let formattedData = "Details:</br>";
      formattedData += `Title: ${comicData.Title}</br>`;
      formattedData += `Characters: <ul><li>${comicData.Characters.join("</li><li>")}</li></ul>`;
      formattedData += `Chapter Count: ${comicData.Chapters.length}`;
      detailsRef.current.innerHTML = formattedData;
      filesRef.current.disabled = false;
    } else {
      detailsRef.current.innerText = "";
      filesRef.current.disabled = true;
    }
  }

  function fileHandler(e) {
    setFiles(e.target.files);
    setImages(
      Array.from(e.target.files).map((file) => {
        return URL.createObjectURL(file);
      })
    );
  }

  function formHandler(e) {
    e.preventDefault();
    if (!fileData) {
      return;
    }
    const data = new FormData();

    data.append("comictitle", selectedComicData.comicTitle);
    data.append("chapternumber", selectedComicData.chapterCount + 1);
    Array.from(fileData).forEach((file) => {
      data.append("chaptercontent", file);
    });

    const betterAxios = new XMLHttpRequest();
    betterAxios.open("POST", process.env.REACT_APP_SERVER_BASE_URL + "/comics/UploadChapter");
    betterAxios.send(data);
    betterAxios.onload = (event) => {
      if (betterAxios.readyState === 4) {
        const resJSON = JSON.parse(betterAxios.response);
        if (betterAxios.status === 200) {
          const newComic = resJSON.updatedComic;
          setGlobal({ type: "replaceComicAt", payload: { replaceAt: selectedComicData.arrIdx, updatedComic: newComic } });
          filesRef.current.value = "";
          selectRef.current.value = -1;
          detailsRef.current.innerText = "";
          setImages([]);
          alert(resJSON.message);
        }
      }
    };
  }

  return (
    <React.Fragment>
      <div className="Basic-Form">
        <label htmlFor="SelectComic"> Select a Comic to add to </label>
        <select id="SelectComic" onChange={titleHandler} ref={selectRef}>
          <option value={-1}></option>
          {Global.comicsLst.map((comic, idx) => {
            return (
              <option key={comic.Title} value={idx}>
                {comic.Title}
              </option>
            );
          })}
        </select>
        <div id="ComicDetails" className="grid-col-2" ref={detailsRef}></div>
        <label htmlFor="ChapterFiles">Select Files</label>
        <input type="file" id="ChapterFiles" multiple accept="image/jpeg, image/png" onChange={fileHandler} ref={filesRef} disabled={true} />
        <div className="FormControls">
          <input type="submit" value="Upload Chapter" onClick={formHandler} />
        </div>
        <div className="grid-col-2 files-preview">
          {imgArr.map((img, idx) => {
            return <img src={img} alt="No Img" key={idx} />;
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ChapterUpload;
