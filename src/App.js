import React, { useEffect, useReducer } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import MainNav from "./components/MainNav";
import ComicDisplay from "./UserPages/ComicDisplay";
import CharaDisplay from "./UserPages/CharaDisplay";
import ComicManager from "./AdminPanel/ComicManager";
import ChaptersDisplay from "./components/comic/ChaptersDisplay";
import ChapterViewer from "./components/comic/ChapterViewer";
import CharacterManager from "./AdminPanel/CharacterManager";

export const GlobalContext = React.createContext();

const initalState = {
  comicsLst: [],
  charaLst: [],
};

const reducer = (curstate, action) => {
  switch (action.type) {
    case "initComicsLst":
      return { charaLst: curstate.charaLst, comicsLst: action.payload };
    case "initCharaLst":
      return { comicsLst: curstate.comicsLst, charaLst: action.payload };
    case "addToCharaLst":
      return { comicsLst: curstate.comicsLst, charaLst: [...curstate.charaLst, ...action.payload] };
    case "addToComicLst":
      return { comicsLst: [...curstate.comicsLst, action.payload], charaLst: curstate.charaLst };
    case "replaceComicAt":
      const newComicsLst = curstate.comicsLst.map((elem, idx) => {
        if (idx === Number(action.payload.replaceAt)) {
          return action.payload.updatedComic;
        } else {
          return elem;
        }
      });
      return { comicsLst: newComicsLst, charaLst: curstate.charaLst };
    case "replaceCharAt":
      const updatedCharaLst = curstate.charaLst.map((elem, idx) => {
        if (idx === Number(action.payload.replaceAt)) {
          return action.payload.updatedChara;
        } else {
          return elem;
        }
      });
      return { comicsLst: curstate.comicsLst, charaLst: updatedCharaLst };
    case "replaceCharAtMulti":
      let charaIterator = -1;
      const newCharLst = curstate.charaLst.map((elem, idx) => {
        if (action.payload.replaceAt.includes(idx)) {
          charaIterator++;
          return action.payload.updatedObjs[charaIterator];
        } else {
          return elem;
        }
      });
      charaIterator = -1;
      return { comicsLst: curstate.comicsLst, charaLst: newCharLst };
    default:
      return curstate;
  }
};

const App = () => {
  const [Global, setGlobal] = useReducer(reducer, initalState);
  useEffect(() => {
    axios.get("/comics").then((res) => {
      setGlobal({ type: "initComicsLst", payload: res.data });
    });
    axios.get("/characters").then((res) => {
      setGlobal({ type: "initCharaLst", payload: res.data });
    });
  }, []);

  useEffect(() => {
    console.log(Global);
  }, [Global]);

  return (
    <GlobalContext.Provider value={[Global, setGlobal]}>
      <div>
        <MainNav />
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="/ManageComics" element={<ComicManager />} />
          <Route path="/ManageCharacters" element={<CharacterManager />} />
          <Route path="/Characters" element={<CharaDisplay />} />
          <Route path="/Comics" element={<ComicDisplay />} />
          <Route path="/Comics/:ComicTitle" element={<ChaptersDisplay />} />
          <Route path="/Comics/:ComicTitle/Read" element={<ChapterViewer />} />
          <Route path="/404" element={<h1 color="red">404 Not Found</h1>} />
          <Route path="*" element={<Navigate to={"/404"} replace={true} />} />
        </Routes>
      </div>
    </GlobalContext.Provider>
  );
};

export default App;
