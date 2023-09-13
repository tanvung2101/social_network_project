import React from "react";
import { SyncOutlined } from "@ant-design/icons";

const ForgotPasswordForm = ({
  handleSubmit,
  email,
  setEmail,
  newPassword,
  setNewPassword,
  secret,
  setSecret,
  loading,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group p-2">
        <small>
          <label className="text-muted">Email address</label>
        </small>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control"
          placeholder="Email address"
        />
      </div>

      <div className="form-group p-2">
        <small>
          <label className="text-muted">New Password</label>
        </small>
        <input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type="password"
          className="form-control"
          placeholder="Enter new password"
        />
      </div>

     
        <>
          <div className="form-group p-2">
            <small>
              <label className="text-muted">Pick a question</label>
            </small>
            <select className="form-control">
              <option>What is your favourite color?</option>
              <option>What is best friend's name?</option>
              <option>What city you were born?</option>
            </select>
            <small className="form-text text-muted">
              You can you this to rest your password if forgotten
            </small>
          </div>

          <div className="form-group p-2">
            <input
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              type="text"
              className="form-control"
              placeholder="write your answer here"
            />
          </div>
        </>
    

      <div className="form-group p-2">
        <button
          disabled={!email || !newPassword || !secret || !loading}
          className="btn btn-primary col-12"
        >
          {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
