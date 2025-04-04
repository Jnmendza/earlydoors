// src/app/test/page.tsx (just temporary)

import { getTeams } from "@/data/teams";

export default async function TestPage() {
  const teams = await getTeams();
  return (
    <div>
      <pre>{JSON.stringify(teams, null, 2)}</pre>
    </div>
  );
}
