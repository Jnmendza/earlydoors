import HomeSideBar from "@/components/HomeSideBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className='grid grid-cols-[3.7fr_1fr] w-full h-screen'>
      {/* Image Side */}
      <div className='relative w-full h-full'>
        <Image
          src='/assets/BeachDay.png'
          alt='BeachDay'
          fill
          className='object-cover'
        />
      </div>

      {/* Sidebar Side */}
      <div className='relative overflow-visible flex justify-end'>
        <HomeSideBar />
      </div>
    </div>
  );
}
