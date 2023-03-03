import "./App.css";
import { useState } from "react";
import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import SuccessDialog from "./components/SuccessDialog";
import Error from "./components/Error";
import WaitingAlert from "./components/WaitingAlert";

function App() {
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showWaitingAlert, setShowWaitingAlert] = useState(false);
  const [showSignature, setSignature] = useState("");

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleErrorClose = () => {
    setShowError(false);
  };
  const handleWaitingAlertClose = () => {
    setShowWaitingAlert(false);
  };

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  async function airDropSol() {
    try {
      const ADDRESS = new PublicKey(address);

      setShowWaitingAlert(true);
      const signature = await connection.requestAirdrop(
        ADDRESS,
        LAMPORTS_PER_SOL
      );

      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();

      await connection.confirmTransaction(
        {
          blockhash,
          lastValidBlockHeight,
          signature,
        },
        "finalized"
      );

      setOpen(false);
      setSignature(signature);
      setShowDialog(true);
    } catch (error) {
      setOpen(false);
      setShowError(true);
    }
    setAddress("");
  }
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <SuccessDialog
        open={showDialog}
        onClose={handleClose}
        signature={showSignature}
      />
      <Error showError={showError} onClose={handleErrorClose}></Error>
      <WaitingAlert
        showWaitingAlert={showWaitingAlert}
        onClose={handleWaitingAlertClose}
      ></WaitingAlert>
      <div className="container">
        <h1>
          <span className="span"> Solana Devnet Faucet:</span> Get Free SOL for
          Testing Your Dapps
        </h1>
        <label htmlFor="address">
          Enter Your Wallet Address Below <span className="symbol"> 👇️</span>{" "}
        </label>
        <input
          type="text"
          id="address"
          value={address}
          autoComplete="off"
          placeholder="9v9XWzB8EQVJNpPfMvzbNgnWZkHgSsT1T1KTzv9XpT8n"
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button
          onClick={() => {
            setOpen(true);
            airDropSol();
          }}
          disabled={address.length < 32}
          title={
            address.length >= 32 ? "" : "Please enter a Solana address first."
          }
        >
          Send Request
        </button>
      </div>
    </>
  );
}
export default App;
