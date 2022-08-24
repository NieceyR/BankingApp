function Deposit(){
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState(' ');
    const [deposit, setDeposit] = React.useState("");
    const email = localStorage.getItem("email");
    const [account, setAccount] = React.useState({});
    const loggedIn = localStorage.getItem("email") != null;

    return (
      <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={
        show ? (
          <DepositForm
          setShow={setShow}
          setDeposit={setDeposit}
          setStatus={setStatus}
          deposit={deposit}
          setAccount={setAccount}
          />
        ) : (
          <DepositMsg setShow={setShow} />
        )
      }
      />
    );
   
  }

  function DepositMsg(props) {
    return (
      <>
      <h5>Success</h5>
      <button 
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(false);
        }} 
        >Successful Deposit</button>
      </>
    );
  }

  function getAccount(email, setAccount) {
    const url = `/account/find/$email`;
    (async () => {
      const res = await fetch(url);
      const data = await res.json();
      setAccount(data[0]);
    })();
  }

  function validate(num, setStatus) {
    if(isNaN(parseFloat(num))) {
      setStatus("Error: Please enter numbers only");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function negValidate(num, setStatus) {
    if(num < 0) {
      setStatus("Error: Invalid Entry. Please enter a number greater than 0.");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function DepositForm(props) {
    const [email, setEmail] = React.useState("");
    const [amount, setAmount] = React.useState("");

    const {user} = React.useContext(UserContext);

    function handle() {
      if(user?.email === email) {
        if (!validate(amount, props.setStatus) || !negValidate(amount, props.setStatus))
        return;
        const url = `/account/update`;
        (async () => {
          const res = await fetch(url, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, amount}),
          });
          const data = await res.json();
        })();
        getAccount(email, props.setAccount);
        props.setShow(false);
        clearForm(props.setDeposit, props.setShow);
      } else {
        alert("please enter your email address");
      }
    }

    function clearForm(setDeposit, setShow) {
      setDeposit("");
      setShow(false);
    }
    return (
      <>
        Email
        <br/>
        <input
          type="input"
          classname="form-control"
          placeholder="Enter email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}       
          />
          <br/>
          Amount
          <br/>
          <input
            type="number"
            className="form-control"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <br/>
          <button type="submit" className="btn btn-light" onClick={handle}>
            Deposit
          </button>
      </>
    );
  }