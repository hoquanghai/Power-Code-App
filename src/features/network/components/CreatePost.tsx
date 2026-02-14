import { Image, Video } from "lucide-react";
import { useState } from "react";

const EMOJI_LIST = [
  "\u{1F60A}",
  "\u{1F44D}",
  "\u{2764}\uFE0F",
  "\u{1F389}",
  "\u{1F4A1}",
  "\u{1F680}",
  "\u{1F44F}",
  "\u{1F4AA}",
];

export function CreatePost() {
  const [postText, setPostText] = useState("");

  const handleEmojiClick = (emoji: string) => {
    setPostText(postText + emoji);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
          <span className="text-white font-semibold">JD</span>
        </div>
        <div className="flex-1">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Share your thoughts with the team..."
            className="w-full min-h-[100px] p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent text-gray-700 placeholder:text-gray-400"
          />

          <div className="mt-3 flex items-center gap-2 pb-3 border-b border-gray-100">
            {EMOJI_LIST.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleEmojiClick(emoji)}
                className="text-2xl hover:scale-110 transition-transform"
              >
                {emoji}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                <Image className="w-5 h-5" />
                <span className="text-sm font-medium">Photo</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                <Video className="w-5 h-5" />
                <span className="text-sm font-medium">Video</span>
              </button>
            </div>
            <button className="px-6 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e40af] transition-colors font-medium text-sm">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
