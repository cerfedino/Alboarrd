import { headers } from "next/headers";

export type AuthContext = {
  user: string | null;
  groups: string[];
  real_name: string | null;
};

export async function getAuthContext(): Promise<AuthContext> {
  const hdrs = await headers();
  const user = hdrs.get("remote-user");
  const real_name = hdrs.get("remote-name");
  const groupsHeader = hdrs.get("remote-groups");
  const groups = groupsHeader
    ? groupsHeader.split(",").map((g) => g.trim())
    : [];
  return { user, groups, real_name };
}
