import Link from "next/link";

export default function Header() {
  return (
    <header style={{ padding: "18px 0", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
      <nav style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Link href="/" style={{ fontWeight: 700, textDecoration: "none" }}>
          Wedding Quartet
        </Link>
        <div style={{ flex: 1 }} />
        <Link href="/faq" style={{ textDecoration: "none" }}>FAQ</Link>
        <Link href="/contact" style={{ textDecoration: "none" }}>Contact</Link>
      </nav>
    </header>
  );
}
