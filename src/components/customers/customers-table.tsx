import type { User } from "@/types/user";

import { RoleBadge } from "./role-badge";

type CustomersTableProps = {
  users: User[];
};

const tableHeadings = [
  "Customer Name",
  "Gender",
  "Phone Number",
  "Email",
  "Country",
  "Role",
];

export function CustomersTable({ users }: CustomersTableProps) {
  return (
    <div className="-mx-6 overflow-x-auto px-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
      <table className="w-full min-w-225 border-collapse text-left">
        <thead>
          <tr className="border-b border-[#EEEEEE]">
            {tableHeadings.map((heading) => (
              <th
                key={heading}
                scope="col"
                className={`whitespace-nowrap px-4 py-4 text-sm font-medium text-[#B5B7C0] first:pl-0 last:pr-0 ${heading === "Role" ? "w-25" : ""}`}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-[#EEEEEE] last:border-b-0"
            >
              <td className="whitespace-nowrap px-4 py-4 pl-0 text-sm font-medium text-[#292D32]">
                {user.firstName} {user.lastName}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm capitalize text-[#292D32]">
                {user.gender}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-[#292D32]">
                {user.phone}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-[#292D32]">
                {user.email}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-[#292D32]">
                {user.address.country}
              </td>
              <td className="w-25 whitespace-nowrap px-4 py-4 pr-0">
                <RoleBadge role={user.role} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
