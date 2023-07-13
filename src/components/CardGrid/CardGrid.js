import React, { useState } from "react";
import "./CardGridStyle.scss";
import Card from "../Card/Card";
import { useUserContext } from "../../context/usersContext";
import Loader from "../Loader/Loader";

const CardGrid = () => {
  const { users, handlePagination, hasMore } = useUserContext();
  const [loading, setLoading] = useState(false);
  const handleShowMore = async () => {
    setLoading(true);
    await handlePagination();
    setLoading(false);
  };

  return (
    <>
      <div className="card-grid">
        {users.map((user) => (
          <Card key={user.id} {...user} />
        ))}
      </div>
      {hasMore && (
        <button className="btn yellow" onClick={() => handleShowMore()}>
          {loading ? <Loader /> : "Show more"}
        </button>
      )}
    </>
  );
};

export default CardGrid;
