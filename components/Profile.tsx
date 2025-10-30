"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User } from "@deemlol/next-icons";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  console.log("Session user:", session?.user);

  function handleClick() {
    if (status === "loading") return;
    if (!session) {
      router.push("/api/auth/signin"); // not logged in → go to login
    } else {
      setOpen((prev) => !prev); // toggle dropdown
    }
  }

  return (
    <div className="relative ml-10">
      {/* Profile Icon / User Image */}
      <div
        onClick={handleClick}
        className="rounded-full overflow-hidden border-2 cursor-pointer flex items-center justify-center w-12 h-12"
      >
        {session?.user?.image ? (
          <img
            src={session.user.image}
            alt="User Avatar"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        ) : (
          <User size={28} className="text-red-600" />
        )}
      </div>

      {/* Dropdown Menu */}
      {open && session && (
        <div className="absolute -left-52  mt-2  w-69 bg-white dark:bg-neutral-900  grid grid-cols-1 shadow-md rounded-xl border z-50 p-4 -px-10">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={session.user?.image || "/default-avatar.png"}
              alt="User"
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{session.user?.name}</p>
              <p className="text-sm text-gray-500">{session.user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="w-full bg-red-500 text-white py-1 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
