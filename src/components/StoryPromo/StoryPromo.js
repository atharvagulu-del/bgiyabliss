import React from 'react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';

const StoryPromo = () => {
  return (
    <div className="w-full relative z-10 bg-white">
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/newsletter_bg.png"
        bgImageSrc="/newsletter_bg.png"
        title="Cultivate Nature"
        scrollToExpand="Scroll to unearth our roots"
        textBlend={false}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl md:text-5xl font-bold text-emerald-900 font-heading">
              Rooted in Sustainability
            </h3>
            <p className="text-lg text-emerald-700/80 leading-relaxed">
              At Bgiya Bliss, we believe every plant tells a story. From the nutrient-rich soil we curate to the eco-friendly packaging we use, our mission is to bring you closer to nature without leaving a footprint behind.
            </p>
            <div className="pt-4">
              <button className="px-8 py-4 bg-emerald-700 text-white rounded-full font-medium shadow-[0px_4px_20px_rgba(4,120,87,0.3)] hover:bg-emerald-800 transition-colors hover:-translate-y-1 transform duration-200">
                Read Our Story
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3 hover:shadow-lg transition-shadow border border-emerald-100">
              <div className="w-12 h-12 bg-emerald-200 rounded-full flex items-center justify-center text-2xl mb-2">🌱</div>
              <h4 className="font-semibold text-emerald-900">100% Organic</h4>
              <p className="text-sm text-emerald-700">Locally sourced, organic plant care essentials.</p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3 hover:shadow-lg transition-shadow border border-emerald-100 mt-8">
              <div className="w-12 h-12 bg-emerald-200 rounded-full flex items-center justify-center text-2xl mb-2">♻️</div>
              <h4 className="font-semibold text-emerald-900">Eco-Packaging</h4>
              <p className="text-sm text-emerald-700">Biodegradable materials for a greener planet.</p>
            </div>
          </div>
        </div>
      </ScrollExpandMedia>
    </div>
  );
};

export default StoryPromo;
