import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const Nav = () => {
  const [state, setState] = useContext(UserContext);

  const router = useRouter();
  console.log(router.pathname);

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };
  return (
    <nav
      className="nav d-flex justify-content-between"
      style={{ backgroundColor: "blue" }}
    >
      <Link
        className={`nav-link text-light logo ${
          router.pathname === "/" && "active"
        }`}
        href="/"
      >
        MERNCAMP
      </Link>

      {state !== null ? (
        <>
          <div className="dropdown">
            <a
              className="btn dropdown-toggle text-light"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {state && state.user && state.user.name}
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <Link
                  href="/user/dashboard"
                  className={`nav-link dropdown-item ${
                    router.pathname === "/user/dashboard" && "active"
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/user/profile/update"
                  className={`nav-link dropdown-item ${
                    router.pathname === "/user/profile/update" && "active"
                  }`}
                >
                  Profile
                </Link>
              </li>
              <li onClick={logout} className="nav-link">
                Logout
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <Link
            className={`nav-link text-light ${
              router.pathname === "/login" && "active"
            }`}
            href="/login"
          >
            Login
          </Link>

          <Link
            className={`nav-link text-light ${
              router.pathname === "/register" && "active"
            }`}
            href="/register"
          >
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
