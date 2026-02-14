import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface PostProps {
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  timestamp: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
}

const REACTION_EMOJIS = ["\u{1F44D}", "\u{2764}\uFE0F", "\u{1F60A}", "\u{1F389}", "\u{1F4A1}"];

export function Post({
  author,
  timestamp,
  content,
  likes,
  comments,
  shares,
}: PostProps) {
  const [liked, setLiked] = useState(false);
  const [showReactions, setShowReactions] = useState(false);

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold">{author.avatar}</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{author.name}</h3>
            <p className="text-sm text-gray-500">{author.role}</p>
            <p className="text-xs text-gray-400 mt-1">{timestamp}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">{content}</p>
      </div>

      {/* Engagement Stats */}
      <div className="flex items-center justify-between py-3 border-t border-b border-gray-100 mb-3">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            {REACTION_EMOJIS.slice(0, 3).map((emoji, index) => (
              <span
                key={index}
                className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white border-2 border-white text-sm"
              >
                {emoji}
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {liked ? likes + 1 : likes} reactions
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{comments} comments</span>
          <span>{shares} shares</span>
        </div>
      </div>

      {/* Interaction Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <button
            onClick={() => setLiked(!liked)}
            onMouseEnter={() => setShowReactions(true)}
            onMouseLeave={() => setShowReactions(false)}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors w-full ${
              liked
                ? "text-red-500 bg-red-50"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Heart className={`w-5 h-5 ${liked ? "fill-red-500" : ""}`} />
            <span className="font-medium text-sm">Like</span>
          </button>

          {/* Reaction Bubble */}
          {showReactions && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white shadow-lg rounded-full px-3 py-2 border border-gray-200 flex gap-1">
              {REACTION_EMOJIS.map((emoji, index) => (
                <button
                  key={index}
                  className="text-2xl hover:scale-125 transition-transform"
                  onClick={() => setLiked(true)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors flex-1">
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium text-sm">Comment</span>
        </button>

        <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors flex-1">
          <Share2 className="w-5 h-5" />
          <span className="font-medium text-sm">Share</span>
        </button>
      </div>
    </article>
  );
}
