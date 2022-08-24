const Logout = () => {

    const {setUser} = React.useContext(UserContext);
  
    const history = ReactRouterDOM.useHistory();
  
    const handlelogout = () => {
      setUser(null);
      localStorage.clear();
      history.push('/');
    };
    
    return (
      <div className="nav-item ">
        <a className="nav-link" id="logout" href="#/" onClick={handlelogout}>
          logout
        </a>
      </div>
    );
  };