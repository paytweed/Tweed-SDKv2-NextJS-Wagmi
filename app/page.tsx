"use client";

import {
  useAccount,
  useBalance,
  useChainId,
  useConnect,
  useDisconnect,
  useSendTransaction,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { useTweedFrontendSDK } from "@paytweed/frontend-sdk-react";

export default function Home() {
  const account = useAccount();
  const {
    connectors,
    connect,
    status: connectStatus,
    error: connectError,
  } = useConnect();
  const { disconnect } = useDisconnect();
  const { chains, switchChain } = useSwitchChain();
  const { sendTransaction } = useSendTransaction();
  const chainId = useChainId();

  const sdk = useTweedFrontendSDK();

  const showWalletAddtress = () => {
    sdk.wallet.showAddress();
  };

  const createWallet = () => {
    sdk.wallet.create({
      callbacks: {
        onSuccess: (data) => {
          console.log("success", data);
        },
      },
    });
  };

  const address = account.address;
  const result = useBalance({
    address,
  });

  const {
    data: hash,
    writeContract,
    isPending,
    error: writeContractError,
  } = useWriteContract();
  const abi = [
    {
      name: "safeMint",
      type: "function",
      stateMutability: "nonpayable",
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      outputs: [],
    },
  ] as const;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    console.log("submit");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const tokenId = formData.get("tokenId") as string;
    writeContract({
      address: "0xe5bbeee02ec67cbe3422007f4f023ef324af9360",
      abi,
      functionName: "safeMint",
      args: [BigInt(tokenId)],
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  async function handleSendTransaction() {
    sendTransaction({
      to: address!,
      value: BigInt(0),
      chainId: chainId,
    });
  }

  const balance = result.data?.value;
  const decimals = result.data?.decimals;
  const balanceAsString =
    balance && decimals ? Number(balance) / 10 ** decimals : "";

  return (
    <>
      <div>
        <h1>TWEED X WAGMI</h1>
        <h2>Account</h2>
        <div>
          status: {account.status}
          <br />
          addresses: {account.addresses}
          <br />
          chainId: {account.chainId}
          <br />
          balance: {balanceAsString}
        </div>
        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}

        {account.status === "connected" && (
          <>
            <h2>Switch Network</h2>
            <div>
              {chains.map((chain) => (
                <button
                  key={chain.id}
                  onClick={() => switchChain({ chainId: chain.id })}
                >
                  {chain.name}
                </button>
              ))}
            </div>

            <div>
              <h2>Send Transaction</h2>

              <button onClick={handleSendTransaction}>send transaction</button>
            </div>
            <div>
              <form onSubmit={submit}>
                <input name="tokenId" placeholder="69420" required />
                <button type="submit">Mint</button>
              </form>
              {hash && <div>Transaction Hash: {hash}</div>}
              {isPending && <div>Transaction is Pending</div>}
              {isConfirming && <div>Waiting for confirmation...</div>}
              {isConfirmed && <div>Transaction confirmed.</div>}
              {writeContractError && (
                <div>Error: {writeContractError.message}</div>
              )}
            </div>
          </>
        )}

        <h3>Status</h3>
        <div>{connectStatus}</div>
        <div>{connectError?.message}</div>
      </div>

      <div>
        <h5>Sdk v1</h5>
        <button onClick={showWalletAddtress}>Show Wallet Address</button>
        <button onClick={createWallet}>create Wallet</button>
      </div>
    </>
  );
}
