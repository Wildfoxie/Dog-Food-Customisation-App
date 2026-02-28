import { Article } from '../types';
import { ChevronLeft, Share2, Bookmark } from 'lucide-react';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
}

export default function ArticleDetail({ article, onBack }: ArticleDetailProps) {
  return (
    <div className="space-y-6 -mt-6 -mx-6">
      <div className="relative h-80">
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute top-6 left-6 flex gap-2">
          <button 
            onClick={onBack}
            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute top-6 right-6 flex gap-2">
          <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
            <Share2 size={20} />
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
            <Bookmark size={20} />
          </button>
        </div>
        <div className="absolute bottom-8 left-8 right-8">
          <span className="bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 inline-block">
            {article.category}
          </span>
          <h2 className="text-2xl font-bold text-white leading-tight">
            {article.title}
          </h2>
        </div>
      </div>

      <div className="px-6 pb-12 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden">
              <img src={`https://ui-avatars.com/api/?name=${article.author}&background=0F766E&color=fff`} alt={article.author} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">{article.author}</p>
              <p className="text-xs text-slate-500">Veterinary Specialist</p>
            </div>
          </div>
          <p className="text-xs font-medium text-slate-400">{article.date}</p>
        </div>

        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 leading-relaxed text-lg italic border-l-4 border-primary/30 pl-4 py-1">
            Personalized nutrition isn't a luxury; it's the foundation of preventative veterinary care.
          </p>
          <p className="text-slate-600 leading-relaxed mt-4">
            {article.content}
          </p>
          <p className="text-slate-600 leading-relaxed mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-slate-600 leading-relaxed mt-4">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
}
