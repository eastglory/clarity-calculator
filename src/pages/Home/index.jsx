import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { authenticate, logoutUser, userSession } from "../../lib/auth";
import { calculate } from "../../lib/calculate";

function Home(props) {
  const [userData, setUserData] = useState();
  const [valA, setValA] = useState();
  const [valB, setValB] = useState();
  const [finishData, setFinishData] = useState();
  const [calcMode, setCalcMode] = useState("addition");

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, "/");
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  const calculateHandler = async () => {
    if (!isNaN(valA) && !isNaN(valB))
      calculate(valA, valB, setFinishData, calcMode);
    else alert("Please fill out the numbers");
  };

  return (
    <div className="flex flex-col bg-gray-100 items-center justify-center w-full min-h-screen">
      <div>
        <h1 className="text-5xl font-mono text-center">
          {"<"}Stacalc{"/>"}
        </h1>
        <p className="font-serif text-center">
          Super simple calculator on{" "}
          <a
            href="https://www.stacks.co/"
            target="_blank"
            rel="noreferrer"
            className="border-b border-dashed border-black"
          >
            Stacks blockchain
          </a>
        </p>
        {userData !== undefined ? (
          <p className="font-serif text-center my-2">
            Connected to:{" "}
            <span className="bg-gray-200 px-2 py-1">
              {userData.profile.stxAddress.testnet.slice(0, 4) +
                "..." +
                userData.profile.stxAddress.testnet.slice(-4)}
            </span>
          </p>
        ) : (
          <div className="my-2">&nbsp;</div>
        )}
        <div className="flex flex-row space-x-5 mt-10">
          <input
            type="number"
            className="border border-black p-2"
            placeholder="Value 1"
            // Receive number only
            onChange={(event) => {
              setValA(event.target.value);
            }}
          ></input>
          <select
            name="operator"
            id="operator"
            className="px-5 py-3 border border-black"
            onChange={(e) => setCalcMode(e.target.value)}
          >
            <option value="addition">+</option>
            <option value="subtraction">-</option>
            <option value="multiplication">x</option>
            <option value="division">/</option>
          </select>
          <input
            type="number"
            className="border border-black p-2"
            placeholder="Value 2"
            // Receive number only
            onChange={(event) => {
              setValB(event.target.value);
            }}
          ></input>
        </div>
        <div className="flex flex-row items-center justify-center mt-10 space-x-5">
          {userSession.isUserSignedIn() ? (
            <button
              onClick={logoutUser}
              className="px-5 py-3 bg-black text-gray-50 disabled:bg-gray-300"
            >
              Disconnect Wallet
            </button>
          ) : (
            <button
              onClick={authenticate}
              className="px-5 py-3 bg-black text-gray-50 disabled:bg-gray-300"
            >
              Connect Wallet
            </button>
          )}
          <button
            className="px-5 py-3 bg-black text-gray-50 disabled:bg-gray-300"
            disabled={!userSession.isUserSignedIn()}
            onClick={calculateHandler}
          >
            Calculate
          </button>
        </div>
        <div className="mt-5">
          {finishData !== undefined ? (
            <p className="text-center font-serif">
              <a
                href={
                  "https://explorer.stacks.co/txid/0x" +
                  finishData.txId +
                  "?chain=testnet"
                }
                target="_blank"
                rel="noreferrer"
                className="border-b border-dashed border-black"
              >
                Click to see result
              </a>
            </p>
          ) : (
            <span>&nbsp;</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
