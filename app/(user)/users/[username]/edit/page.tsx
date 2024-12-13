/**
 * 사용자 정보수정 화면
 */

interface ParamsProps {
  params: {
    username: string;
  };
}

export default function UserEdit({ params }: ParamsProps) {
  return (
    <>
      <span className="dark:text-white">Edit Page</span>
    </>
  );
}
