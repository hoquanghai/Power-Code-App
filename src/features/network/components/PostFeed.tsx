import { CreatePost } from "./CreatePost";
import { Post } from "./Post";

const MOCK_POSTS = [
  {
    author: {
      name: "Jessica Martinez",
      role: "VP of Engineering",
      avatar: "JM",
    },
    timestamp: "2h ago",
    content:
      "Excited to share our Q1 results! Our team exceeded all expectations and delivered outstanding performance. A huge thank you to everyone who made this possible. Here's to an even better Q2!",
    likes: 128,
    comments: 34,
    shares: 12,
  },
  {
    author: {
      name: "Alex Thompson",
      role: "Senior Product Designer",
      avatar: "AT",
    },
    timestamp: "4h ago",
    content:
      "Just wrapped up an amazing design sprint with the team. The new dashboard mockups are looking incredible! Can't wait to share more details next week. Stay tuned!",
    likes: 89,
    comments: 21,
    shares: 7,
  },
  {
    author: {
      name: "Rachel Foster",
      role: "Marketing Director",
      avatar: "RF",
    },
    timestamp: "6h ago",
    content:
      "Our latest campaign just hit 1 million impressions! This wouldn't have been possible without the collaborative effort of the marketing, design, and content teams. Thank you all!",
    likes: 156,
    comments: 42,
    shares: 18,
  },
  {
    author: {
      name: "Marcus Johnson",
      role: "Tech Lead",
      avatar: "MJ",
    },
    timestamp: "8h ago",
    content:
      "Reminder: Monthly tech talk is tomorrow at 2 PM. We'll be discussing microservices architecture and best practices. All engineers are welcome to join! Looking forward to great discussions.",
    likes: 67,
    comments: 15,
    shares: 9,
  },
  {
    author: {
      name: "Lisa Chen",
      role: "HR Manager",
      avatar: "LC",
    },
    timestamp: "10h ago",
    content:
      "We're hiring! Looking for talented individuals to join our growing team. Multiple positions open across Engineering, Design, and Product. Check out our careers page for details. Let's build something great together!",
    likes: 143,
    comments: 56,
    shares: 31,
  },
];

export function PostFeed() {
  return (
    <div className="flex-1 max-w-2xl mx-auto">
      <div className="space-y-6">
        <CreatePost />
        {MOCK_POSTS.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>
    </div>
  );
}
