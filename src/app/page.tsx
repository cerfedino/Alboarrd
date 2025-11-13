import { getAuthContext } from "@/lib/auth-headers";

export default async function Home() {
  const { user, groups } = await getAuthContext();
  if (!user) return <h1>Not authenticated</h1>;

  return (
    <div className="min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Hello {user}</h1>
      <p>{groups.join(", ")}</p>
    </div>
  );
}
