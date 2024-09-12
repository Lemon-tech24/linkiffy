import React from "react";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return <div>Config the {id}</div>;
};

export default Page;
