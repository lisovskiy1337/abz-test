import React, { useState } from "react";
import "./PostSectionStyle.scss";
import Form from "../Form/Form";
import Success from "../Success/Success";
const PostSection = () => {
  const [success, setSuccess] = useState(false);

  return (
    <section className="mt-120">
      <div className="container">
        {success ? (
          <Success success={success} />
        ) : (
          <>
            <h3 className="h1 tac">Working with POST request</h3>
            <Form setSuccess={setSuccess} />
          </>
        )}
      </div>
    </section>
  );
};

export default PostSection;
