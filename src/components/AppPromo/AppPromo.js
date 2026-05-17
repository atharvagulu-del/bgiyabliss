import React from 'react';
import Image from 'next/image';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import Link from 'next/link';
import { Apple, PlayCircle } from 'lucide-react';

const AppPromo = () => {
  return (
    <section className="bg-white py-10 md:py-20 overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl md:text-6xl font-semibold text-black dark:text-white mb-6">
              Experience Bgiya Bliss on <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-emerald-500 to-green-600 text-transparent bg-clip-text">
                Your Mobile Device
              </span>
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="#"
                className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors shadow-lg"
              >
                <Apple size={24} />
                <div className="text-left">
                  <div className="text-[10px] leading-tight">Download on the</div>
                  <div className="font-semibold leading-tight">App Store</div>
                </div>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors shadow-lg"
              >
                <PlayCircle size={24} />
                <div className="text-left">
                  <div className="text-[10px] leading-tight">GET IT ON</div>
                  <div className="font-semibold leading-tight">Google Play</div>
                </div>
              </Link>
            </div>
          </>
        }
      >
        <Image
          src="/bgiya_app_mockup.png"
          alt="Bgiya Bliss Mobile App"
          height={1080}
          width={1080}
          className="mx-auto rounded-2xl object-cover h-full object-center"
          draggable={false}
        />
      </ContainerScroll>
    </section>
  );
};

export default AppPromo;
