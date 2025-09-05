"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000";

const NavBar = ({ scanId }) => {
  const [serviceGroups, setServiceGroups] = useState({});
  const [activeMenu, setActiveMenu] = useState(null);
  const navRef = useRef();
  const { data: session } = useSession();

  const handleMenuClick = (group) => {
    setActiveMenu((prev) => (prev === group ? null : group));
  };

  // 🔹 Fetch service groups from backend
  useEffect(() => {
    const fetchServiceGroups = async () => {
      if (!session?.user || !session?.id_token) return;

      try {
        const response = await fetch(
          `${BASE_URL}/scans/get_service_groups/${session.user}/${scanId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session.id_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch service groups");

        const data = await response.json();
        setServiceGroups(data.service_groups || {});
      } catch (error) {
        console.error("❌ Error fetching service groups:", error);
      }
    };

    fetchServiceGroups();
  }, [session?.user, session?.id_token, scanId]);

  // 🔹 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 🔹 Logout clears NextAuth + Keycloak
  const handleLogout = async () => {
    if (!session?.id_token) return;

    await signOut({ redirect: false });

    const logoutUrl = `http://localhost:9000/realms/cloud/protocol/openid-connect/logout?id_token_hint=${session.id_token}&post_logout_redirect_uri=http://localhost:3000`;
    window.location.href = logoutUrl;
  };

  return (
    <nav
      ref={navRef}
      className="bg-black text-white px-6 py-4 shadow-lg z-50 relative flex justify-between items-center"
    >
      {/* Left Side: Logo + Menus */}
      <ul className="flex space-x-6 text-sm font-medium items-center">
        <Link href={"/"} className="cursor-pointer">
          <h2 className="text-lg text-red-700 tracking-[.4em]">
            CLOUD <span className="text-blue-700">SERVICES</span>
          </h2>
        </Link>

        {Object.entries(serviceGroups).map(([group, services], idx, arr) => (
          <li key={group} className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => handleMenuClick(group)}
            >
              <h1 className="capitalize hover:text-gray-300">{group}</h1>
              <FaChevronDown className="text-sm" />
            </div>

            {activeMenu === group && (
              <div
                className={`absolute top-full mt-2 ${
                  idx > arr.length - 3 ? "right-0" : "left-0"
                } border bg-black border-gray-900 text-white rounded-lg shadow-2xl p-4 w-[320px] flex flex-col z-50`}
              >
                {services.map((service) => (
                  <Link
                    key={`${group}-${service}`}
                    href={`/Findings/${scanId}/${service.toLowerCase()}`}
                    className="block border-gray-600 hover:bg-gray-900 px-3 py-2 rounded-md transition duration-150"
                  >
                    <p className="font-semibold capitalize">{service}</p>
                  </Link>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Right Side: Logout Button */}
      {session && (
        <button
          onClick={handleLogout}
          className="border border-red-800 hover:border-red-600 px-4 py-2 rounded-md text-sm"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default NavBar;
