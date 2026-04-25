import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/categories';

export default function BlogSection() {
  return (
    <section className="py-8 md:py-10 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        <div className="flex items-end justify-between gap-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 tracking-tight">
            From the Blog
          </h2>
          <a href="/blog" className="flex items-center gap-1 text-emerald-600 font-semibold text-sm hover:text-emerald-700 transition-colors shrink-0">
            All Articles <ArrowRight size={16} />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {blogPosts.map((post) => (
            <a 
              key={post.id} 
              href={post.link} 
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-emerald-200 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-44 md:h-48 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-2">
                  <Clock size={12} />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-base font-bold font-heading text-gray-900 group-hover:text-emerald-700 transition-colors mb-2 leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="text-emerald-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={13} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
