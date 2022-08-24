function Balance(){
  const ctx = React.useContext(UserContext);
  return (
    <>
    <h5>Balance</h5>
    {JSON.stringify(ctx)}<br/>
    </>
  );
}
