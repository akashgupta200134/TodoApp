"use client"
import Lottie from "lottie-react";
import Hello from "@/assets/hello.json";

export default function Rightbar() {
  return (
    <>
      <div className="border w-[26%] mr-4 h-[550px]  rounded-xl  dark:bg-gray-950 transition-all duration-300">
        <div className="mt-5 ml-5">
          <p className="font-semibold text-xl">Task :</p>
          <p className="text-gray-800 dark:text-gray-200 text-[16px] font-normal  leading-relaxed mt-2">
            Hello there, I hope you’re doing well.<br />
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

        <Lottie animationData={Hello} className="mt-10" />

      </div>
    </>
  );
}
