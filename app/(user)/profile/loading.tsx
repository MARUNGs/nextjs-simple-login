export const dynamic = "force-dynamic";

export default async function ProfileLoading() {
  return (
    <div className="flex flex-col items-center">
      <div>
        <div className="w-32 h-10 bg-stone-500 rounded-lg my-5" />
        <div className="w-40 h-10 bg-stone-500 rounded-lg" />
      </div>
      <div className="flex flex-col items-center my-10 w-3/5 h-60 border rounded-md"></div>
    </div>
  );
}
