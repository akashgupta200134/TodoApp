"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User } from "@deemlol/next-icons";

export default function Profile() {
const { data: session, status } = useSession();
const router = useRouter();
const [open, setOpen] = useState(false);

const handleClick = () => {
if (status === "loading") return;

if (!session) {
  router.push("/signin"); // redirect to your custom signin page
} else {
  setOpen((prev) => !prev);
}


};

const handleLogout = async () => {
await signOut({ callbackUrl: "/" }); // redirect after logout
setOpen(false);
};

return (
<div className="relative ml-10">
{/* Profile Icon */}
<div onClick={handleClick} className="rounded-full overflow-hidden border-2 cursor-pointer flex items-center justify-center w-12 h-12 border-gray-300 dark:border-neutral-700" >
{session?.user?.image ? (
<img src={session.user.image} alt="User Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
) : (
<User size={28} className="text-gray-600 dark:text-gray-300" />
)}
</div>

  {/* Dropdown Menu */}
  {open && session && (
    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-900 shadow-lg rounded-xl border border-gray-200 dark:border-neutral-700 z-50 p-4">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={session.user?.image || "/default-avatar.png"}
          alt="User"
          referrerPolicy="no-referrer"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold text-gray-800 dark:text-gray-100">
            {session.user?.name || "No Name"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {session.user?.email}
          </p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  )}
</div>


);
}