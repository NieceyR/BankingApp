function NavBar() {
  const {setUser, user} = React.useContext(UserContext);
  const Link = ReactRouterDOM.Link;
  const history = ReactRouterDOM.useHistory();

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    history.push("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="#">
        BadBank
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"

      >
        <span className="navbar-toggler-icon"></span>

      </button>
      <div
        className="collapse navbar-collapse d-lg-inline-flex flex-lg-row-reverse"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          {user ? (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  id="logout"
                  to="#"
                  onclick={handleLogout}
                >
                Logout
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/deposit">
                  Deposit                
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/withdraw">
                  Withdraw                
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/alldata">
                  AllData                
                </Link>
              </li>
            </>
          ): (
            <>
            <li className="nav-item">
              <Link className="nav-link" to="/create-account">
                Create Account
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login/google">
                Login With Google
              </a>
            </li>
            </>
          )}

          <li className="nav-item float-right">{user?.name} </li>
        </ul>
      </div>
    </nav>
  );
}

