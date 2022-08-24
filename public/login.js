function Login(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState(' ');

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body= {
        show ? <LoginForm setShow={setShow} /> : <LoginMsg setShow={setShow} />
      }    
    />
  );


}

function LoginMsg(props) {
  return (
    <>
      <h5>Welcome Back</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(false)}
      >
        Success!
      </button>
    </>
  );
}

function LoginForm(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const {setUser} = React.useContext(UserContext);

  function handleLogin() {
    console.log(email, password);
    const url = `/account/login/${email}/${password}`;
    (async () => {
      const res = await fetch(url, {
        method: "GET",
      })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        if(res.success) {
          setUser(res.user);
          console.log("res2", res.success);
          localStorage.setItem("data", res.user.name);
          console.log("res.", res.user.name);
        }
      });
    })();
    props.setShow(false);
  }

  return (
    <>
      Email address
      <br />
      <input
      type="input"
      className="form-control"
      placeholder="Enter email"
      value={email}
      onChange={(e) => setEmail(e.currentTarget.value)}/>
      <br/>
      <input
        type="password"
        className="form-control"
        placeholder="Enter passsword"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)} />
        <br/>
        <button type="submit" className="btn btn-light" onClick={handleLogin}>
          Login
        </button>
    </>
  );
}