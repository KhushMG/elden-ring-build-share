import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen">
    <SignUp
      appearance={{
        elements: {
          formButtonPrimary: "bg-slate-500 hover:bg-slate-400 text-sm",
        },
      }}
    />
    </div>
  );
}
