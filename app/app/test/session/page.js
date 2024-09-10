import { auth } from "@/auth";

export default async function () {
  const session = auth();

  return (
    <>
      <div>{JSON.stringify(session)}</div>
      <button>Sign out</button>
    </>
  );
}
