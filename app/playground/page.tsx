import fs from "fs";
import path from "path";
import Link from "next/link";

export default function PlaygroundIndex() {
  // Get all directories inside /playground
  const playgroundPath = path.join(process.cwd(), "app/playground");
  const folders = fs
    .readdirSync(playgroundPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return (
    <main className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Playground</h1>
      <ul className="space-y-3">
        {folders.map((folder) => (
          <li key={folder}>
            <Link
              href={`/playground/${folder}`}
              className="text-blue-600 underline hover:text-blue-800"
            >
              {folder}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}