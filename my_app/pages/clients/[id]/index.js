import { useRouter } from "next/router";
import React from "react";

function ClientProjectPage() {
  const router = useRouter();
  console.log(router.query);

  function loadProjectHandler() {
    router.push({
      pathname: "/clients/[id]/[clientProjectid]",
      query: { id: "max", clientProjectid: "projecta" },
    });
  }

  return (
    <div>
      <h1>The Project of Given Client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}

export default ClientProjectPage;
