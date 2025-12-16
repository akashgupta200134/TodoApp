"use client";

import Lottie from "lottie-react";
import Hello from "@/assets/hello.json";

export default function Rightbar() {
  return (
    <div
      className="
        border
        w-[95%] md:w-[26%]
        h-auto md:h-[550px]
        mx-2

        mt-6 md:mt-0
          sm:mx-3 md:mr-4 md:ml-0

        rounded-xl
        dark:bg-gray-950
        transition-all duration-300
        overflow-hidden
      "
    >
      {/* Text Content */}
      <div className="px-4 pt-4 md:mt-5 md:ml-5 md:px-0">
        <p className="font-semibold text-lg md:text-xl">Task :</p>

        <p className="text-gray-800 dark:text-gray-200 text-[15px] md:text-[16px] leading-relaxed mt-2">
          Hello there, I hope you’re doing well.
          <br />
          This app is made by{" "}
          <a
            href="https://github.com/akashgupta200134"
            target="_blank"
            className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            @akashgupta200134
          </a>
          <br />
          Give it a ⭐
        </p>
      </div>

      {/* Animation */}
      <div className="flex justify-center mt-3 md:mt-10 px-4 md:px-0">
        <Lottie
          animationData={Hello}
          className="w-full max-w-[260px] md:max-w-none"
        />
      </div>
    </div>
  );
}
