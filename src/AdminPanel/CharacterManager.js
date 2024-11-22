import React, { useContext, useReducer, useRef, useEffect, useState } from "react";
import { GlobalContext } from "../App";
import Character from "../components/characters/Character";

const initialState = {
  objID: "",
  name: "",
  comics: "",
  portrait: undefined,
  bio: undefined,
};

const reducer = (curstate, action) => {
  switch (action.type) {
    case "setAll":
      return action.payload;
    case "setName":
      return { ...curstate, name: action.payload };
    case "setPortrait":
      return { ...curstate, portrait: action.payload };
    case "setBio":
      return { ...curstate, bio: action.payload };
    case "reset":
      return initialState;
    default:
      return curstate;
  }
};

function CharacterManager() {
  const [Global, setGlobal] = useContext(GlobalContext);
  const [SelectedChara, setSelectedCharacter] = useReducer(reducer, initialState);
  const [selectedIdx, selectIdx] = useState(-1);
  const [actionText, setActionText] = useState("Creating New Character");
  const [highlightedChar, highlightChar] = useState(undefined);
  const nmeRef = useRef(null);
  const portraitRef = useRef(null);
  const bioRef = useRef(null);

  useEffect(() => {
    highlightChar(document.getElementById("AddNewChar"));
  }, []);

  function clearFields() {
    nmeRef.current.value = "";
    portraitRef.current.value = "";
    bioRef.current.value = "";
  }

  function formHandler(e) {
    e.preventDefault();
    // -1 is the index of create new character. If it is greater than -1, It means it is in update mode
    const betterAxios = new XMLHttpRequest();
    if (selectedIdx > -1) {
      const data = new FormData();
      data.append("charaID", SelectedChara.objID);
      data.append("charaname", SelectedChara.name);
      data.append("characterportrait", SelectedChara.portrait);
      data.append("characterbio", SelectedChara.bio);
      betterAxios.open("POST", process.env.REACT_APP_SERVER_BASE_URL + "/characters/UpdateChara");
      betterAxios.send(data);
      betterAxios.onload = (event) => {
        const resJSON = JSON.parse(betterAxios.response);
        if (betterAxios.status === 200) {
          setGlobal({ type: "replaceCharAt", payload: { replaceAt: selectedIdx, updatedChara: resJSON.updatedChar } });
          alert(resJSON.message);
        }
      };
    } else {
      const data = new FormData();
      data.append("charaname", SelectedChara.name);
      if (SelectedChara.portrait !== undefined) {
        data.append("characterportrait", SelectedChara.portrait);
      }
      if (SelectedChara.bio !== undefined) {
        data.append("characterbio", SelectedChara.bio);
      }

      betterAxios.open("POST", process.env.REACT_APP_SERVER_BASE_URL + "/characters/NewChara");
      betterAxios.send(data);
      betterAxios.onload = (event) => {
        if (betterAxios.readyState === 4) {
          if (betterAxios.status === 200) {
            const resJSON = JSON.parse(betterAxios.response);
            setGlobal({ type: "addToCharaLst", payload: [resJSON.newChara] });
            alert(resJSON.message);
          }
        }
      };
      betterAxios.onerror = (event) => {
        alert(JSON.parse(betterAxios.response).error);
      };
    }
    setSelectedCharacter({ type: "reset" });
    selectIdx(-1);
    clearFields();
  }

  function clickEvent(event, charData = undefined, idx = -1) {
    highlightChar((prevHighlighted) => {
      prevHighlighted.classList.remove("activeChar");
      event.target.classList.add("activeChar");
      return event.target;
    });
    clearFields();
    if (charData === undefined) {
      setSelectedCharacter({ type: "reset" });
      setActionText("Create New Character");
    } else {
      setSelectedCharacter({ type: "setAll", payload: charData });
      setActionText("Update data of " + charData.name);
    }
    selectIdx(idx);
    nmeRef.current.scrollIntoView();
  }

  return (
    <React.Fragment>
      <h1>Select a character or click the + to create a new one</h1>
      <div className="Characters-Flex">
        <Character
          isActive={true}
          id="AddNewChar"
          isLocalResource={true}
          portrait={"AddNewChara.jpg"}
          displayname="New"
          key={-1}
          onClick={(e) => {
            clickEvent(e);
          }}
        />
        {Global.charaLst.map((character, idx) => {
          return (
            <Character
              portrait={character.portrait}
              displayname={character.name}
              key={idx}
              onClick={(e) => {
                clickEvent(e, character, idx);
              }}
            />
          );
        })}
      </div>
      <div className="Basic-Form">
        <h2 className="grid-col-2">{actionText}</h2>
        <label htmlFor="CharName">Character Name</label>
        <input
          type="text"
          id="CharName"
          ref={nmeRef}
          onChange={(e) => {
            setSelectedCharacter({ type: "setName", payload: e.target.value });
          }}
        />
        <label htmlFor="CharPortrait">Character Portrait</label>
        <input
          type="file"
          accept="image/jpeg, image/png"
          id="CharPortrait"
          ref={portraitRef}
          onChange={(e) => {
            setSelectedCharacter({ type: "setPortrait", payload: e.target.files[0] });
          }}
        />
        <label htmlFor="CharBio">Character Bio</label>
        <input
          type="file"
          accept="image/jpeg, image/png"
          id="CharBio"
          ref={bioRef}
          onChange={(e) => {
            setSelectedCharacter({ type: "setBio", payload: e.target.files[0] });
          }}
        />
        <div className="CharaPreview grid-col-2"></div>
        <div className="FormControls">
          <input type="submit" value="Save Character" onClick={formHandler} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default CharacterManager;
