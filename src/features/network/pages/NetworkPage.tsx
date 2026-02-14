import { PostFeed } from "../components/PostFeed";
import { RightSidebar } from "../components/RightSidebar";

export function NetworkPage() {
  return (
    <div className="flex flex-1">
      {/* Feed */}
      <PostFeed />

      {/* Right Sidebar - Trending & Suggestions */}
      <RightSidebar />
    </div>
  );
}
