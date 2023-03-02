import "./App.css";
import { useState } from "react";
import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";

function App() {
  const [address, setAddress] = useState("");
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  async function airDropSol() {
    try {
      const ADDRESS = new PublicKey(address);

      // console.log(PublicKey.isOnCurve(ADDRESS));

      const signature = await connection.requestAirdrop(
        ADDRESS,
        LAMPORTS_PER_SOL
      );

      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();

      // 3 - Confirm transaction success
      await connection.confirmTransaction(
        {
          blockhash,
          lastValidBlockHeight,
          signature,
        },
        "finalized"
      );

      // 4 - Log results
      console.log(
        `Tx Complete: https://explorer.solana.com/tx/${signature}?cluster=devnet`
      );
    } catch (error) {
      console.log(error);
      return;
    }

    setAddress("");
  }
  return (
    <>
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
        <button onClick={airDropSol}>Send Request</button>
      </div>
    </>
  );
}
export default App;
