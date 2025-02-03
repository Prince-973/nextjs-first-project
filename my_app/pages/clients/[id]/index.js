import { useRouter } from "next/router";
import React from "react";

function ClientProjectPage() {
  const router = useRouter();
  console.log(router.query);

  return (
    <div>
      <h1>Dynamic [id]</h1>
    </div>
  );
}

export default ClientProjectPage;
