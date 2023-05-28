import CryptoJS from "crypto-js";
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [screen, setScreen] = useState("encrypt");

  const [encrptedData, setEncrptedData] = useState("");
  const [decrptedData, setDecrptedData] = useState("");

  const secretPass = "XkhZG4fW2t2W";

  const encryptData = () => {
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(text),
      secretPass
    ).toString();

    setEncrptedData(data);
  };

  const decryptData = () => {
    const bytes = CryptoJS.AES.decrypt(text, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    setDecrptedData(data);
  };

  const switchScreen = (type) => {
    setText("");
    setEncrptedData("");
    setDecrptedData("");
    setScreen(type);
  };

  const handleClick = () => {
    if (!text) return;

    if (screen === "encrypt") encryptData();
    else decryptData();
  };

  return (
    <div className="container">
      <div>
        <button
          className="btn btn-left"
          style={{
            backgroundColor: screen === "encrypt" ? "#B13535" : "#5e35b130",
          }}
          onClick={() => {
            switchScreen("encrypt");
          }}
        >
          Criptografar
        </button>

        <button
          className="btn btn-right"
          style={{
            backgroundColor: screen === "decrypt" ? "#B13535" : "#1e88e530",
          }}
          onClick={() => {
            switchScreen("decrypt");
          }}
        >
          Descriptografar
        </button>
      </div>

      <div className="card">
        <input
          value={text}
          onChange={({ target }) => {
            setText(target.value);
          }}
          name="text"
          type="text"
          placeholder={
            screen === "encrypt" ? "Insira uma senha" : "Inserir dados criptografados"
          }
        />

        <button className="btn submit-btn" onClick={handleClick}>
          {screen === "encrypt" ? "Criptografar" : "Descrriptografar"}
        </button>
      </div>

      {encrptedData || decrptedData ? (
        <div className="content">
          <label>{screen === "encrypt" ? "Encrypted" : "Decrypted"} Data</label>
          <p>{screen === "encrypt" ? encrptedData : decrptedData}</p>
        </div>
      ) : null}
    </div>
  );
}

export default App;

