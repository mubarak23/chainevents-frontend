"use client";

import { useState } from "react";
import GenericModal from "../components/GenericModal";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useAccount } from "@starknet-react/core";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EventCard from "@/components/EventCard";

function HomePage() {
  const { address } = useAccount();

  return (
    <div className="text-white overflow-x-hidden flex flex-col items-center text-center">
      <main className="pt-[74px] pb-[197px]">
        {!address ? (
          <div className="mt-48 lg:mt-56 px-5 mx-auto max-w-screen-lg text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-6 lg:mb-8 leading-tight">
              Next-Gen Ticketing <br />
              <span className="text-2xl sm:text-4xl lg:text-5xl font-medium">
                Secure and Decentralized on StarkNet
              </span>
            </h1>
            <p className=" sm:text-base lg:text-lg font-medium leading-6 sm:leading-7 lg:leading-8 mb-8 sm:mb-10 lg:mb-12 mx-auto max-w-lg lg:max-w-3xl">
              Discover the future of ticketing on StarkNet. Enjoy
              fraud-resistant, transparent, and decentralized ticketing
              solutions that provide peace of mind and ease of use for every
              event. Step into the future with us.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col bg-[#1E1D1D] border-[.5px] border-white pt-6 rounded-[50px] pb-[67px] px-4  justify-center text-center w-[740px]">
              <div className="flex justify-center mb-4 items-center">
                <Image
                  src="/assets/chainevtlogo.svg"
                  width={50}
                  height={50}
                  alt="#"
                />
                <h2 className="text-lg leading-6 font-extrabold">
                  CHAINEVENTS
                </h2>
              </div>
              <h1 className="text-[28px] leading-[45px] font-extrabold text-white mb-2">
                Own Your Tickets, <br />
                <span className=" text-[#83F7A0] ">
                  Enhance Your Experience
                </span>
              </h1>

              <div className="w-[200px] mx-auto">
                <Image
                  src="/assets/calendar-02.svg"
                  width={200}
                  height={200}
                  alt="#"
                  className="mx-auto"
                />

                <p className="mt-2 mb-6 text-base leading-5 text-[#C4C4C4] font-normal">
                  You have no current event <br />
                  <span className="font-semibold">Host one</span>
                </p>

                <Link
                  href={"/create-event"}
                  className="bg-black py-4 px-[38px] flex items-center gap-x-[10px] rounded-full text-sm leading-[18px] font-semibold border-[.5px] border-white"
                >
                  <Image
                    src="/assets/add-circle.svg"
                    width={16}
                    height={16}
                    alt="#"
                  />
                  <span>Create Event</span>
                </Link>
              </div>
            </div>
          </>
        )}
      </main>

    </div>
  );
}

export default HomePage;
