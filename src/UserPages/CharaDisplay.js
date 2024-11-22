import React, { useContext, useState } from "react";
import { GlobalContext } from "../App";
import Character from "../components/characters/Character";
import CharacterDetails from "../components/characters/CharacterDetails";

export default function CharaDisplay() {
  const [Global, setGlobal] = useContext(GlobalContext);
  const [charaIdx, setCharaIdx] = useState(0);

  function randomChara() {
    setCharaIdx(() => {
      const randNum = Math.round(Math.random() * (Global.charaLst.length - 1));
      return randNum;
    });
  }

  if (Global.charaLst.length === 0) {
    return <React.Fragment></React.Fragment>;
  }
  return (
    <React.Fragment>
      <h1>Click on a Character to view their details</h1>
      <div className="Characters-Flex">
        <Character isLocalResource={true} portrait={"PickRandomChara.jpg"} displayname={"Random"} key={-1} onClick={randomChara} />
        {Global.charaLst.map((character, idx) => {
          return (
            <Character
              portrait={character.portrait}
              displayname={character.name}
              key={idx}
              onClick={() => {
                setCharaIdx(idx);
              }}
            />
          );
        })}
      </div>
      <CharacterDetails
        portrait={Global.charaLst[charaIdx].portrait}
        bio={Global.charaLst[charaIdx].bio}
        comics={Global.charaLst[charaIdx].comics}
        name={Global.charaLst[charaIdx].name}
      />
    </React.Fragment>
  );
}
