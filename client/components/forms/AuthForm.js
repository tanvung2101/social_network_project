import React from "react";
import { SyncOutlined } from "@ant-design/icons";

const AuthForm = ({
  handleSubmit,
  username,
  setUsername,
  about,
  setAbout,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  loading,
  page,
  profileUpdate,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {profileUpdate && (
        <div className="form-group p-2">
          <small>
            <label className="text-muted">Username</label>
          </small>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter name"
          />
        </div>
      )}

      {profileUpdate && (
        <div className="form-group p-2">
          <small>
            <label className="text-muted">About</label>
          </small>
          <input
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Write about yourself..."
          />
        </div>
      )}

      {page !== "login" && (
        <div className="form-group p-2">
          <small>
            <label className="text-muted">Your name</label>
          </small>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter name"
          />
        </div>
      )}

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
          disabled={profileUpdate}
        />
      </div>

      <div className="form-group p-2">
        <small>
          <label className="text-muted">Password</label>
        </small>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
          placeholder="Password"
        />
      </div>

      {page !== "login" && (
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
      )}

      <div className="form-group p-2">
        <button
          disabled={
            profileUpdate
              ? loading
              : page === "login"
              ? !email || !password || loading
              : !name || !email || !secret || !password || loading
          }
          className="btn btn-primary col-12"
        >
          {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
