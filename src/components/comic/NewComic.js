import React, { useContext, useRef, useState } from "react";
import { GlobalContext } from "../../App";
import axios from "axios";

function ComicCreate() {
  const titleRef = useRef(null);
  const charaRef = useRef(null);
  const [charList, setCharacters] = useState([]);

  const [Global, setGlobal] = useContext(GlobalContext);

  function formHandler(e) {
    e.preventDefault();
    const comicdata = {
      comictitle: titleRef.current.value,
      characterlst: charList,
    };
    axios({
      method: "post",
      url: "/comics/CreateComic",
      data: comicdata,
    }).then((res) => {
      setGlobal({ type: "addToComicLst", payload: res.data.comicDetails });
      let displayMessage = res.data.message;
      const GlobalNamesLst = Global.charaLst.map((chara) => {
        return chara.name;
      });
      if (charList.every((char) => GlobalNamesLst.includes(char)) === false) {
        const newChars = charList.filter((char) => !GlobalNamesLst.includes(char));
        axios({
          method: "post",
          url: "/characters/NewCharaArr",
          data: { charaArr: newChars },
        }).then((serverRes) => {
          displayMessage += "\nAnd " + serverRes.data.message;
          alert(displayMessage);
          LinkCharacters(charList);
        });
      } else {
        alert(displayMessage);
        LinkCharacters(charList);
      }
    });
  }

  function LinkCharacters(charaArr) {
    console.log("Linking " + charaArr);
    axios({
      method: "post",
      url: "/characters/AddToComic",
      data: {
        characters: charaArr,
        comicTitle: titleRef.current.value,
      },
    }).then((result) => {
      console.log(result);
      setGlobal({ type: "replaceCharAtMulti", payload: { replaceAt: result.data.updatesIndex, updatedObjs: result.data.updatedChars } });
      setCharacters([]);
      titleRef.current.value = "";
    });
  }

  function ListHandler(e) {
    if (e.key === "," || e.key === "Tab") {
      e.preventDefault();
      if (charList.includes(charaRef.current.value) !== true) {
        setCharacters((prevList) => {
          const newChara = charaRef.current.value;
          charaRef.current.value = "";
          return [...prevList, newChara];
        });
      } else {
        charaRef.current.value = "";
        alert("Character is already in the List");
      }
    }
  }

  return (
    <React.Fragment>
      <div className="Basic-Form">
        <h1 className="FormHeading">Create New Comic</h1>
        <label htmlFor="ComicTitle">Comic Title</label>
        <input type="text" id="ComicTitle" ref={titleRef} />
        <label htmlFor="CharacterInpBox">Enter Character name:</label>
        <div className="form-controls">
          <input type="text" id="CharacterInpBox" ref={charaRef} list="charaData" onKeyDown={ListHandler} />
          <span className="SubText">To confirm name press "," or TAB</span>
        </div>
        <datalist id="charaData">
          {Global.charaLst.map((chara, idx) => {
            return <option key={idx}>{chara.name}</option>;
          })}
        </datalist>
        <label htmlFor="CharaList">Added Characters: </label>
        <div className="CharaList">
          {charList.map((charaName, index) => {
            return (
              <span key={index}>
                {charaName}
                <button
                  className="del-btn"
                  onClick={() => {
                    setCharacters((prevList) =>
                      prevList.filter((chara) => {
                        return chara !== charaName;
                      })
                    );
                  }}
                >
                  X
                </button>
              </span>
            );
          })}
        </div>
        <div className="FormControls">
          <input type="submit" value="Create Comic" onClick={formHandler} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default ComicCreate;
