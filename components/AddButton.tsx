interface ButtonProps {
  isPending?: boolean;
}

export default function Button({ isPending }: ButtonProps) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className={`bg-[#f5bb16] py-2 h-auto w-[300px] rounded font-semibold text-center transition-colors ${
        isPending
          ? "opacity-70 cursor-not-allowed"
          : "hover:bg-[#f1a50a] cursor-pointer"
      }`}
    >
      {isPending ? "Adding..." : "Add Todo"}
    </button>
  );
}
