// app/admin/badges/[id]/generate-static-params.ts

export async function generateStaticParams() {
  const delegateIds = [
    "a410a68c-523c-4bd5-8d9d-ec11bab2d2f9",
    "another-id",
    "etc-id",
  ];

  return delegateIds.map((id) => ({
    id,
  }));
}
