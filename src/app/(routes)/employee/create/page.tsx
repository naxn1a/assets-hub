import FormEmployee from "@/components/form/FormEmployee";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CreateEmployee() {
  return (
    <section>
      <div className="flex my-4">
        <Link href="/employee">
          <Button>Back</Button>
        </Link>
      </div>
      <FormEmployee />
    </section>
  );
}
