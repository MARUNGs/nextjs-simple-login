import { useFormStatus } from "react-dom";

export default function Button({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-stone-300 pt-2 pb-2 font-semibold active:scale-90 transition-transform"
      disabled={pending}
    >
      {pending ? "loading ..." : text}
    </button>
  );
}
