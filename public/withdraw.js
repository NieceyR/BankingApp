function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [withdraw, setWithdraw] = React.useState("");
  const [account, setAccount] = React.useState({});

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <WithdrawForm
            setShow={setShow}
            setWithdraw={setWithdraw}
            setStatus={setStatus}
            withdraw={withdraw}
            setAccount={setAccount}
          />
        ) : (
          <WithdrawMsg setShow={setShow} />
        )
      }
    />
  );
}

function WithdrawMsg(props) {
  return (
    <>
      <h5>Withdrawl Amount</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(false);
        }}
      >
        Successful Withdrawal!
      </button>
    </>
  );
}

function getAccount(email, setAccount) {
  const url = `/account/find/${email}`;
  (async () => {
    const res = await fetch(url);
    const data = await res.json();
    setAccount(data[0]);
  })();
}

function validate(num, setStatus) {
  if (isNaN(parseFloat(num))) {
    setStatus("Error: Please enter numbers Only");
    setTimeout(() => setStatus(""), 3000);
    return false;
  }
  return true;
}

function WithdrawForm(props) {
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");

  const { user } = React.useContext(UserContext);

  function handle() {
    if (user?.email === email) {
      if (!validate(amount, props.setStatus)) return;
      const url = "/account/updateWithdraw";
      (async () => {
        const res = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, amount }),
        });
        const data = await res.json();
      })();
      getAccount(email, props.setAccount);
      props.setShow(false);
      clearForm(props.setWithdraw, props.setShow);
    } else {
      alert('please enter your email address');
    }
  }

  function clearForm(setWithdraw, setShow) {
    setWithdraw("");
    setShow(false);
  }

  return (
    <>
      Email
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      Amount
      <br />
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Withdraw
      </button>
    </>
  );
}