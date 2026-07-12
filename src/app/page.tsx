import SignIn from "@/components/buttons/sign-in";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <SignIn />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
