import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";

function CharacterDetails(props) {
  const { portrait, name, comics, comicObj, bio } = props;
  const [curTab, setCurTab] = useState("Comics");
  const [selectedTab, selectTab] = useState(null);

  let bodyContent = "";

  const NavigateTo = useNavigate();
  const [Global] = useContext(GlobalContext);

  useEffect(() => {
    selectTab(document.getElementById("comicTab"));
  }, []);

  let bioSrc = process.env.REACT_APP_SERVER_BASE_URL + bio;
  if (bio === "") {
    bioSrc = "./DefaultImgs/BioDefault.jpg";
  }
  let portraitSrc = process.env.REACT_APP_SERVER_BASE_URL + portrait;
  if (portrait === "") {
    portraitSrc = "./DefaultImgs/PortraitDefault.jpg";
  }

  function swapTab(event) {
    selectTab((prev) => {
      prev.classList.remove("activeCharTab");
      event.target.classList.add("activeCharTab");
      return event.target;
    });
  }

  if (curTab === "Comics") {
    try {
      bodyContent = (
        <div
          className="PartOfComics"
          onLoad={(e) => {
            selectTab(e.target);
          }}
        >
          <span>Comics featuring {name}</span>
          <div className="ComicsLst">
            {comics.map((comic, idx) => {
              const selectedComic = Global.comicsLst.filter((comicObj) => {
                return comicObj.Title === comic;
              })[0];
              if (selectedComic.Chapters.length > 0) {
                return (
                  <div key={idx}>
                    {comic}
                    <div className="LinkWrapper">
                      <button
                        onClick={(e) => {
                          const formattedComic = {
                            title: selectedComic.Title,
                            characters: selectedComic.Characters,
                            chapters: selectedComic.Chapters,
                            updatedOn: selectedComic.UpdatedAt,
                            createdOn: selectedComic.CreatedAt,
                            status: selectedComic.Status,
                          };
                          NavigateTo(`/Comics/${comic}`, { state: formattedComic });
                        }}
                        className="LinkBtn"
                      >
                        Read
                      </button>
                    </div>
                  </div>
                );
              } else {
                return <React.Fragment key={idx}></React.Fragment>;
              }
            })}
          </div>
        </div>
      );
    } catch (error) {
      bodyContent = <React.Fragment>Loading content......</React.Fragment>;
    }
  } else if (curTab === "Bio") {
    try {
      bodyContent = <img src={bioSrc} alt="" className="CharBio" />;
    } catch (error) {
      bodyContent = <React.Fragment>Loading content......</React.Fragment>;
    }
  }

  return (
    <div className="CharaDetails">
      <div className="CharaHeader">
        <img src={portraitSrc} alt="" className="CharaPortrait" />
        <span>{name}</span>
      </div>
      <div className="CharaBody">
        <div className="TabControls">
          <button
            id="comicTab"
            className="activeCharTab"
            onClick={(e) => {
              swapTab(e);
              setCurTab("Comics");
            }}
          >
            Comics
          </button>
          <button
            onClick={(e) => {
              swapTab(e);
              setCurTab("Bio");
            }}
          >
            Bio
          </button>
        </div>
        <div className="BodyContent">{bodyContent}</div>
      </div>
    </div>
  );
}

export default CharacterDetails;
