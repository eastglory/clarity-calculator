import { openContractCall } from "@stacks/connect";
import { intCV } from "@stacks/transactions";
import Config from "./config";

export const calculate = async (valA, valB, setFinishData, type) => {
  return await openContractCall({
    onCancel: () => {}, // do nothing when canceled
    onFinish: (tx) => setFinishData(tx),
    contractAddress: Config.contractAddress,
    contractName: Config.contractName,
    functionName: type,
    functionArgs: [intCV(valA), intCV(valB)],
  });
};
