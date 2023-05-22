import packageJson from "@/package.json";
export default function Footer() {
  return (
    <footer>
      <span> เวอร์ชัน: {packageJson["version"]}</span>
    </footer>
  );
}
