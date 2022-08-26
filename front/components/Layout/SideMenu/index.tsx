import Link from "next/link";

export default function SideMenu() {
  return (
    <div className="side-menu">
      <div className="side-menu-items">
        <Link href="/invoices">Invoices</Link>
        <Link href="/users">Users</Link>
        <Link href="/clients">Clients</Link>
      </div>
    </div>
  );
}
