// 좋아요 버튼

export default function LikeButton({ likeCount }: { likeCount: number }) {
  return (
    <button>
      Likes ❤️ <span className="ml-2">{likeCount}</span>
    </button>
  );
}
