const CreateAccount = () => {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = ReactRouterDOM.useHistory();
    

    function validate(field, label) {
        if (!field) {
            setStatus("Error" + label);
            setTimeout(() => setStatus(""), 3000);

            return false;
        } 
        return true;
    }
// hello help me 

    function handleCreate(){
        console.log(name, email, password);
        if(!validate(name, "name")) return;
        if(!validate(email, "email")) return;
        if(!validate(password, "password")) return;
        const url = `/account/create/${name}/${email}/${password}`;
        (async () => {
            var res = await fetch(url, {method: "POST"});
            console.log("res ==>>", res);
            if(res.status === 200) {
                const data = await res.json();
                console.log(data);
                setShow(true);
                alert("You are successfully registered!");
                setTimeout(() => {
                    history.push('/login');
                }, 1000);
            } else {
                alert("User already exisits.");
            }
        })();
        setName("");
        setEmail("");
        setPassword("");
        setShow(true);
    }

    
    
    
    function clearForm(){
        setName('');
        setEmail('');
        setPassword('');
        setShow(true);
    }
    
    return (
        <Card
          bgcolor = "primary"
          header = "Create Account"
          status = {status}
          body = {show ? (
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.currentTarget.value)} /><br/>
              Email<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setName(e.currentTarget.value)} /><br/>
              Password<br/>
              <input type="input" className="form-control" id="password" placeholder="Enter password" value={password} onChange={(e) => setName(e.currentTarget.value)} /><br/>
              <button type="submit" disabled= {!email || !password || !name} className="btn btn-outline-dark" value="submit" onClick= {handleCreate}>{" "}Create Account</button>
              </>
          ):(
              <>
              <h5>Success</h5>
              <button type="submit" disabled= {!email || !password || !name} className="btn btn-outline-dark" value= "submit" onClick={clearForm}>Add another account</button>
              </>
          )}  
        />
    )
  }

