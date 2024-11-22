import React from "react";

function Character({ portrait, isLocalResource = false, displayname, onClick = undefined, id = null, isActive = false }) {
  let displayImage = "";
  if (isLocalResource) {
    displayImage = "./DefaultImgs/" + portrait;
  } else if (portrait === "") {
    displayImage = "./DefaultImgs/PortraitDefault.jpg";
  } else {
    displayImage = process.env.REACT_APP_SERVER_BASE_URL + portrait;
  }
  return (
    <div className={`CharacterPortrait${isActive ? " activeChar" : ""}`} id={id !== null ? id : undefined}>
      <img src={displayImage} alt="" key={displayImage} onClick={onClick} />
      <div className="CharNameContain">
        <span>{displayname}</span>
      </div>
    </div>
  );
}
export default Character;
