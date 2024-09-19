import "../globals.css";

export const metadata = {
  title: "Admin-Delivery Guy App",
  description: "Admin-Delivery App",
};

export default function AdminLayout({ children }) {
  return (
    <>
      <p>Admin Pages</p>
      {children}
    </>
  );
}
