import { headers } from "next/headers";

export type AuthContext = {
  user: string | null;
  groups: string[];
  real_name: string | null;
};

export async function getAuthContext(): Promise<AuthContext> {
  const hdrs = await headers();
  const user = hdrs.get(process.env.HEADER_USER || "remote-user");
  const real_name = hdrs.get(process.env.HEADER_NAME || "remote-name");
  const groupsHeader = hdrs.get(process.env.HEADER_GROUPS || "remote-groups");
  const groups = groupsHeader
    ? groupsHeader.split(",").map((g) => g.trim())
    : [];
  return { user, groups, real_name };
}
