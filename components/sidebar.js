import Logo from '../public/logo.png'
import React, { useEffect } from "react";
import Image from 'next/image';
import Nav from './nav';

export default function SideBar(props) {
  useEffect(() => {
    var sideBar = window.document.getElementById("mobile-nav");
    if (sideBar.style) {
      sideBar.style.transform = "translateX(-260px)"
    }
  }, [])
  function sidebarHandler(flag) {
    var sideBar = window.document.getElementById("mobile-nav");
    var openSidebar = window.document.getElementById("openSideBar");
    var closeSidebar = window.document.getElementById("closeSideBar");
    sideBar.style.transform = "translateX(-260px)";
    if (flag) {
      sideBar.style.transform = "translateX(0px)";
      openSidebar.classList.add("hidden");
      closeSidebar.classList.remove("hidden");
    } else {
      sideBar.style.transform = "translateX(-260px)";
      closeSidebar.classList.add("hidden");
      openSidebar.classList.remove("hidden");
    }
  }
  return (
    <>
      <div style={{ height: '100vh' }} className="w-64 absolute sm:relative bg-[#1e2019] shadow md:h-full flex-col justify-between hidden sm:flex">
        <div className="px-8">
          <div className="h-16 w-full flex justify-center">
            <Image src={Logo} height={100} alt="Logo" />
          </div>
          <Nav
            makePlans={props.makePlans}
            setActivity={props.setActivity}
            setDestination={props.setDestination}
            setStartDate={props.setStartDate}
            setEndDate={props.setEndDate}
            startDate={props.startDate}
            endDate={props.endDate}
            setBudget={props.setBudget}
            setInterest={props.setInterest}
            interest={props.interest}
            setSideNote={props.setSideNote}
          />
        </div>
        <div className="px-8 border-t border-gray-700">
          <ul className="w-full flex items-center justify-between bg-[#1e2019]">
            <li className="cursor-pointer text-white pt-5 ">
              <button aria-label="show notifications" className="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg3.svg" alt="notifications" />
              </button>
            </li>
            <li className="cursor-pointer text-white pt-5 ">
              <button aria-label="open chats" className="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg4.svg" alt="chat" />
              </button>
            </li>
            <li className="cursor-pointer text-white pt-5 ">
              <button aria-label="open settings" className="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg5.svg" alt="settings" />
              </button>
            </li>
            <li className="cursor-pointer text-white pt-5 ">
              <button aria-label="open logs" className="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg6.svg" alt="drawer" />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-64 z-40 absolute bg-[#1e2019] shadow h-[100%] flex-col justify-between sm:hidden transition duration-150 ease-in-out" id="mobile-nav">
        <button aria-label="toggle sidebar" id="openSideBar" className="h-10 w-10 bg-[#1e2019] absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded focus:ring-gray-800" onClick={() => sidebarHandler(true)}>
          <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg7.svg" alt="toggler" />
        </button>
        <button aria-label="Close sidebar" id="closeSideBar" className="hidden h-10 w-10 bg-[#1e2019] absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer text-white" onClick={() => sidebarHandler(false)}>
          <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg8.svg" alt="cross" />
        </button>
        <div className="px-8">
          <div className="h-16 w-full flex items-center justify-center text-center">
            <Image src={Logo} height={80} alt="Logo" />
          </div>
          <Nav
            makePlans={props.makePlans}
            setActivity={props.setActivity}
            setDestination={props.setDestination}
            setStartDate={props.setStartDate}
            setEndDate={props.setEndDate}
            startDate={props.startDate}
            endDate={props.endDate}
            setBudget={props.setBudget}
            setInterest={props.setInterest}
            interest={props.interest}
            setSideNote={props.setSideNote}
          />
        </div>
        <div className="px-8 border-t mt-30 border-gray-700">
          <ul className="w-full flex items-center justify-between bg-[#1e2019]">
            <li className="cursor-pointer text-white pt-5 pb-3">
              <button aria-label="show notifications" className="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg3.svg" alt="notifications" />
              </button>
            </li>
            <li className="cursor-pointer text-white pt-5 pb-3">
              <button aria-label="open chats" className="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg4.svg" alt="chat" />
              </button>
            </li>
            <li className="cursor-pointer text-white pt-5 pb-3">
              <button aria-label="open settings" className="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg5.svg" alt="settings" />
              </button>
            </li>
            <li className="cursor-pointer text-white pt-5 pb-3">
              <button aria-label="open logs" className="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg6.svg" alt="drawer" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
