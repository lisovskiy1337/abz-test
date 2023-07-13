import React from "react";
import "./CardStyle.scss";
import Truncate from "../Truncate/Truncate";
const Card = ({ name, position, email, phone, photo }) => {
  return (
    <div className="card tac">
      <div className="card__content">
        <img loading="lazy" className="card__img" src={photo} alt="img" />
        <Truncate text={name} addTooltip={true} className="card__name" />
        <Truncate text={position} addTooltip={true} />
        <Truncate text={email} addTooltip={true} />
        <p>{phone}</p>
      </div>
    </div>
  );
};

export default Card;
