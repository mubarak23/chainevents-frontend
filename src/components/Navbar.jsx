"use client";

import { useState } from "react";
import Link from "next/link";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { createPortal } from "react-dom";
import { AccountSidebar } from "./AccountSidebar";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "./Logo";
import ConnectModal from "./ConnectModal";

const navLinks = [
  {
    label: "Create Event",
    to: "/create-event",
    icon: "/assets/event.svg",
  },
  {
    label: "Your Events",
    to: "/your-events",
    icon: "/assets/event.svg",
  },
  {
    label: "All Events",
    to: "/events",
    icon: "/assets/community.svg",
  },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  function onConnect() {
    setIsOpen((prev) => !prev);
    if (isToggle) setIsToggle(false);
  }

  function onToggleNav() {
    setIsToggle((prev) => !prev);
  }

  function onDisconnect() {
    disconnect();
    if (isToggle) setIsToggle(false);
    router.push("/");
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="relative">
      <nav className="pt-[35px] px-4 md:px-[65px] w-full">
        <div
          className={`flex justify-between items-center py-2 px-4 rounded-full text-sm lg:text-base leading-5 text-white bg-[#1E1D1D]`}
        >
          {isOpen &&
            createPortal(<ConnectModal setIsOpen={setIsOpen} />, document.body)}

          {showSidebar && (
            <AnimatePresence>
              <AccountSidebar
                closeFunc={toggleSidebar}
                userAddr={address
                  ?.slice(0, 6)
                  .concat("...")
                  .concat(address?.slice(-4))}
                disconnectFunc={onDisconnect}
              />
            </AnimatePresence>
          )}

          <div className="flex-1 flex justify-start lg:justify-center">
            <Logo />
          </div>

         
          <div className="lg:hidden">
            <button
              onClick={onToggleNav}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300"
            >
              <Image
                src={`${isToggle ? "/assets/close.png" : "/assets/burger.svg"}`}
                width={30}
                height={30}
                alt="Menu"
                className="h-6 w-6"
              />
            </button>
          </div>

          {/* Desktop navigation */}
          <ul className="gap-x-[55px] items-center lg:flex hidden md:mr-4">
            {navLinks.map((link, i) => (
              <Link href={link.to} key={i}>
                <li className="flex justify-center whitespace-nowrap items-center gap-x-2">
                  <Image
                    src={link.icon}
                    alt="event logo"
                    className="h-6 w-6"
                    width={30}
                    height={30}
                  />
                  <span>{link.label}</span>
                </li>
              </Link>
            ))}
          </ul>

          {/* Connect/Disconnect Wallet button */}
          {!address ? (
            <button
              className="py-2 lg:py-3 px-5 hidden lg:block lg:px-[18px] bg-[#C4C4C433] rounded-full text-white font-medium text-sm leading-[18px] w-[166px] text-center"
              onClick={onConnect}
            >
              Connect Wallet
            </button>
          ) : (
            <button
              className=" items-center hidden lg:flex gap-x-[10px] py-2 lg:py-3 px-5 lg:px-[18px] bg-[#C4C4C433] rounded-full text-white font-medium text-sm leading-[18px] w-[166px] text-center"
              onClick={toggleSidebar}
            >
              <Image
                src="/assets/argentLogo.svg"
                className="lg:h-[18px] h-5 w-5 lg:w-[18px]"
                alt=""
                width={18}
                height={18}
              />
              <span>
                {address?.slice(0, 6).concat("...").concat(address?.slice(-4))}
              </span>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isToggle && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden absolute top-24 left-0 right-0 z-50 mx-4 md:mx-[65px] bg-[#1E1D1D] rounded-xl shadow-lg overflow-hidden"
        >
          <ul className="flex flex-col py-4 text-white">
            {navLinks.map((link, i) => (
              <Link href={link.to} key={i} onClick={() => setIsToggle(false)}>
                <li className="flex items-center gap-x-3 px-6 py-3 hover:bg-[#C4C4C433]">
                  <Image
                    src={link.icon}
                    alt={`${link.label} icon`}
                    className="h-5 w-5"
                    width={20}
                    height={20}
                  />
                  <span>{link.label}</span>
                </li>
              </Link>
            ))}
            {!address ? (
              <li
                className="py-2 lg:py-3 px-5 m-4  lg:px-[18px] bg-[#C4C4C433] rounded-full text-white font-medium text-sm leading-[18px] w-[166px] text-center"
                onClick={onConnect}
              >
                Connect Wallet
              </li>
            ) : (
              <li
                className=" items-center flex m-4 gap-x-[10px] py-2 lg:py-3 px-5 lg:px-[18px] bg-[#C4C4C433] rounded-full text-white font-medium text-sm leading-[18px] w-[166px] text-center"
                onClick={toggleSidebar}
              >
                <Image
                  src="/assets/argentLogo.svg"
                  className="lg:h-[18px] h-5 w-5 lg:w-[18px]"
                  alt=""
                  width={18}
                  height={18}
                />
                <span>
                  {address
                    ?.slice(0, 6)
                    .concat("...")
                    .concat(address?.slice(-4))}
                </span>
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </div>
  );
}

export default Navbar;