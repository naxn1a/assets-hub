import FormEmployee from "@/components/form/FormEmployee";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CreateEmployee() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Create Employee</h1>
      <FormEmployee>
        <Link href="/employee">
          <Button variant={"secondary"}>Back</Button>
        </Link>
      </FormEmployee>
    </section>
  );
}
