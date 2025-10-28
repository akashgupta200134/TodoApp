// import { navLinks } from "@/data/navLinks";
import Link from "next/link";
import Profile from "./Profile";

export default function Navbar() {
  return (
    <div className="w-full">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* Logo Section */}
        {/* <div>
            <Link className="text-3xl font-bold text-red-500 cursor-pointer hover:text-red-600 transition" href="/">
            TODO
            </Link>
          
        </div> */}

        {/* Navigation Links */}
        {/* <div className="hidden md:flex gap-8 text-gray-700 font-medium">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className="hover:text-red-500 transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div> */}

        {/* Profile Avatar */}
        
        {/* <Profile /> */}
       
      </div>
    </div>
  );
}
