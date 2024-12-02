import clsx from "clsx";

export default function TweetDetailLoading() {
  return (
    <div
      className={`${clsx(
        "grid grid-cols-[1fr,100px] gap-4",
        "border border-stone-500 rounded-md",
        "my-5 mx-5",
        "animate-pulse"
      )}`}
    >
      <div className={`${clsx("flex flex-col", "*:ml-3 *:mb-5")}`}>
        <div className="flex items-center ml-3 my-5">
          {/* 이미지 */}
          <div className="size-10 mr-3 relative aspect-square ">
            <div className="bg-stone-500 rounded-full size-full" />
          </div>

          {/* 유저 정보 */}
          <div className="flex flex-row gap-2 *:bg-stone-500 *:rounded-lg">
            <div className="skeleton w-20 h-4 " />
            <div className="skeleton w-14 h-4 " />
            <div className="skeleton w-14 h-4 " />
          </div>
        </div>

        {/* 트윗 내용 */}
        <div className="w-96 h-20 rounded-lg bg-stone-500"></div>
        {/* 수정 일자 */}
        <div className="w-14 h-4 rounded-lg bg-stone-500" />
      </div>
    </div>
  );
}
