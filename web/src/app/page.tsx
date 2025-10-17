"use client";
import { useState } from "react";
import { DietForm } from "./_components/diet-form";
import { DietGenerator } from "./_components/diet-generator";
import { UserInfo } from "@/types/diet-data.type";

export default function Home() {
  const [data, setData] = useState<UserInfo | null>(null);

  function handleSubmit(userInfo: UserInfo) {
    setData(userInfo);
  }

  return (
    <>
      {!data ? (
        <DietForm onSubmit={handleSubmit} />
      ) : (
        <>
          <DietGenerator data={data} />
        </>
      )}
    </>
  );
}
