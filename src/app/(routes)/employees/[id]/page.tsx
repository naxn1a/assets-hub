import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Edit() {
  return (
    <section className="flex my-4">
      <Link href="/employees">
        <Button>Back</Button>
      </Link>
    </section>
  );
}
