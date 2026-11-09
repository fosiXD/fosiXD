import { readFileSync, writeFileSync } from "node:fs";

const skillSet = [
  "JavaScript", "TypeScript", "NodeJS", "Python", "Java", "Kotlin",
  "Csharp", "React", "MongoDB", "Linux", "DiscordJS",
];

const icons = [];
for (const skillName of skillSet) {
  const skill = skillName.toLowerCase();
  const src = `https://raw.githubusercontent.com/devicons/devicon/v2.18.0/icons/${skill}/${skill}-original.svg`;

  const res = await fetch(src, { method: "HEAD" });
  if (!res.ok) {
    console.warn(`⚠️  Sin ícono para "${skillName}" (${src}), se omite`);
    continue;
  }
  icons.push(`<img src="${src}" alt="${skillName}" title="${skillName}" width="48" height="48" />`);
}

const block = `<!-- SKILLS:START -->\n<p align="center">\n${icons.join("\n")}\n</p>\n<!-- SKILLS:END -->`;

const original = readFileSync("README.md", "utf8");
const pattern = /<!-- SKILLS:START -->[\s\S]*<!-- SKILLS:END -->/;

if (!pattern.test(original)) {
  console.error("❌ No encontré los marcadores SKILLS:START / SKILLS:END en el README");
  process.exit(1);
}

writeFileSync("README.md", original.replace(pattern, () => block));
console.log(`✅ README actualizado con ${icons.length} íconos`);
