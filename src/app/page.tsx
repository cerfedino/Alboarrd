import { ThemeToggle } from "@/components/theme-toggle";
import { getAuthContext } from "@/lib/auth-headers";
import { promises as fs } from "fs";
import path from "path";
import YAML from "yaml";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export default async function Home() {
  const { user, groups, real_name } = await getAuthContext();
  if (!user) return <h1>Not authenticated</h1>;

  const filePath = path.join("/etc/config.yaml");
  const fileContents = await fs.readFile(filePath, "utf8");
  const LINKS = YAML.parse(fileContents); // JS object

  return (
    <div className="max-h-screen pa-4 items-center justify-center font-sans">
      <ThemeToggle />
      <h1 className="text-4xl w-fill text-center">
        Hello <b>{real_name ? real_name : user}</b>
      </h1>
      <p className="text-xl w-fill text-center">Service dashboard</p>
      <div className="flex max-w-screen flex-row flex-wrap gap-6 items-center justify-center mt-14 mb-4">
        {LINKS.cards
          .filter(
            (link: any) =>
              !link.groups ||
              link.groups.some((r: string) => groups.includes(r))
          )
          .map((link: any) => (
            <a key={link.name} href={link.url}>
              <Card className="size-40 flex items-center justify-center gap-0 p-4 hover:shadow-lg transition-shadow hover:bg-accent/50 group">
                <p className="text-xl align-center">{link.name}</p>
                <Avatar className="size-16 mt-4">
                  <AvatarImage src={link.icon} alt={link.name} />
                  <AvatarFallback className="text-xl">
                    {link.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Card>
            </a>
          ))}
      </div>
    </div>
  );
}
