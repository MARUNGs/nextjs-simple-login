"use client";
import Button from "@/app/components/Button";
// import { useFormState } from "react-dom";
import { PhotoIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useState } from "react";
import { RemoveIcon } from "@/app/components/Icon";
import { formSchema, TweetFormProps } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tweetSubmit } from "./server";

export default function AddTweetContent() {
  // const [state, dispatch] = useFormState(tweetSubmit, null);
  const [preview, setPreview] = useState([]);
  const [addErrMsg, setAddErrMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TweetFormProps>({
    resolver: zodResolver(formSchema),
  });

  // 사진 변경
  function onImageChange(evnet: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { files },
    } = evnet;
    if (!files) return;

    // 이미지 업로드 확인
    const file = files[0];
    if (!file.type.startsWith("image/")) return;

    // 파일사이즈 확인(최대 4MB)
    const maxSize = 4 * (1024 * 1024);
    if (maxSize < file.size) return;

    const imageUrl = URL.createObjectURL(files[0]);
    setPreview((prev) => {
      if (prev.length === 2) {
        setAddErrMsg("더이상 사진을 추가할 수 없습니다.");
        return [...prev];
      }
      return [...prev, imageUrl];
    });
  }

  // 이미지 삭제
  function removeImage(index: number) {
    setPreview((prev) => prev.filter((_, i) => i !== index));
  }

  async function onValid() {
    // 검증 이후 처리
    const onSubmit = handleSubmit(async (data: TweetFormProps) => {
      const formData = new FormData();
      formData.append("tweet", data.tweet);
      await tweetSubmit(formData);
    });

    await onSubmit();
  }

  return (
    <div className="dark:text-white gap-5">
      <form action={onValid} className="flex flex-col m-5">
        <textarea
          {...register("tweet")}
          placeholder="무슨 일이 일어나고 있나요?"
          className="w-full h-96 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
        />
        {errors && <div>{errors.tweet?.message}</div>}
        <input type="text" name="userNo" className="hidden" />

        <div className="flex flex-row my-3 gap-3 flex-wrap">
          {/* 사진추가 */}
          <label
            htmlFor="file"
            className={`${clsx(
              "flex flex-col items-center justify-center",
              "cursor-pointer",
              "size-40 text-neutral-300"
            )}`}
          >
            <PhotoIcon className={`w-40`} />
          </label>
          <input
            onChange={onImageChange}
            type="file"
            id="file"
            name="file"
            className="hidden"
          />

          {/* 사진 미리보기 */}
          {preview && preview.length
            ? preview.map((url, index) => (
                <div
                  key={index}
                  className="size-40 rounded-md bg-center bg-cover relative"
                  style={{ backgroundImage: `url(${url})` }}
                >
                  <RemoveIcon onClick={() => removeImage(index)} />
                </div>
              ))
            : null}
        </div>

        {addErrMsg && <div className="text-red-500">{addErrMsg}</div>}
        <hr className="border-neutral-500" />
        <Button custom="w-20 h-10 self-end my-3" text="작성" />
      </form>
    </div>
  );
}
