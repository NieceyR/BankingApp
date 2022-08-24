function Spa() {
  const [user, setUser] = React.useState(null);

  const PrivateRoute = ({...props}) => {
    return user ? (
      <ReactRouterDOM.Route {...props}/>
    ) : (
      <ReactRouterDOM.Redirect to="/login" />
    );
  };
    return (
      <HashRouter>
        <div>
          <UserContext.Provider
            value={{
              users: [
                {
                  name: "abel",
                  email: "abel@mit.edu",
                  password:"secret",
                  balance: 100,
                },
              ],
              setUser,
              user,
            }}
          >
            <NavBar/>

            <div className="container" style={{padding: "20px"}}>
              <ReactRouterDOM.Switch>
                <Route path="/" exact component={Home} />
                <Route path="/create-account" component={CreateAccount}/>
                <Route path="/login" component={Login}/>
                <PrivateRoute path="/deposit" component={Deposit} />
                <PrivateRoute path="/logout" element={<Logout handleLogout={() => handleLogout()}/>}/>
                <PrivateRoute path="/withdraw" component={Withdraw}/>
                <PrivateRoute path="/alldata" component={AllData} />
              </ReactRouterDOM.Switch>

            </div>

          </UserContext.Provider>
        </div>
      </HashRouter>
    );
  }
  
  ReactDOM.render(
    <Spa/>,
    document.getElementById('root')
  );
  