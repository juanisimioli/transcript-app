import { Role as RoleType } from "@/types/types";

const Role = ({ role }: { role: RoleType }) => {
  return (
    <div
      className={`text-xs font-bold ${
        role === "agent" ? "text-purple" : "text-fuchsia"
      }`}
    >
      {role === "agent" ? "Agent" : "User"}
    </div>
  );
};

export default Role;
