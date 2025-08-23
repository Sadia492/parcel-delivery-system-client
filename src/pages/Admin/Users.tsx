import TableComp from "@/components/modules/Table";

export default function Users() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground text-center">
        👤 Manage Users
      </h1>
      <p className="text-muted-foreground lg:w-1/2 w-full mx-auto text-center mb-2">
        View and manage all registered users in the system. As an admin, you can
        block or unblock accounts, ensure fair usage, and maintain system
        security.
      </p>

      <TableComp></TableComp>
    </div>
  );
}
