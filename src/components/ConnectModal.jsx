"use client";
import { useConnect } from "@starknet-react/core";
import Image from "next/image";

const ConnectModal = ({ setIsOpen }) => {
  const { connect, connectors } = useConnect();

  return (
    <div
      className="fixed top-0 left-0 h-screen w-full bg-white/10 backdrop-blur-lg shadow-lg flex items-center gap-x-4 justify-center z-[100]"
      onClick={() => setIsOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="md:w-[380px] h-[252px] flex px-3 min-w-[300px]   flex-col gap-2 items-center justify-center bg-white  rounded-lg shadow-xl shadow-[rgba(0,0,0,0.2)] loading-gradient
 "
      >
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => {
              connect({ connector });
              setIsOpen(false);
            }}
            className=" w-full text-[]    bg-[#1E1D1D] p-[2px] overflow-hidden gap-4 pr-[15%] rounded-md flex  items-center justify-between   "
          >
            <p className=" py-2 bg-[#C4B07A] w-full  rounded-l-md shadow-inner shadow-[#8a7651] border border-[#9d865a] text-base font-semibold ">
              {" "}
              {connector.id.toUpperCase()}{" "}
            </p>
            <Image
              src={connector.icon}
              alt={connector.id}
              height={25}
              width={25}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConnectModal;
