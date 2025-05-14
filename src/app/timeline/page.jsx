"use client";
import dynamic from "next/dynamic";
const TimeLine = dynamic(() => import("../components/TimeLine"), {
  ssr: false,
});

const TimelinePage = () => {
  return (
    <div className="bg-gradient-to-b from-[#300000] min-h-screen text-white">
      <h1 className="text-4xl font-bold text-center py-8 text-[#D4A017]">
        Хронология Великой российской революции
      </h1>
      <TimeLine />
    </div>
  );
};

export default TimelinePage;
