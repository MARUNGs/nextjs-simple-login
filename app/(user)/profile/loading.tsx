export const dynamic = "force-dynamic";

async function wait() {
  return new Promise((resolve) => setTimeout(resolve, 100000));
}

export default async function ProfileLoading() {
  // await wait();

  return (
    <div className="size-40 bg-stone-500">
      <div className="size-full bg-stone-500"></div>
    </div>
  );
}
