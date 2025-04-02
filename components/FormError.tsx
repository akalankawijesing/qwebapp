"use client";

export function FormErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="text-sm font-medium text-destructive">
      {children}
    </p>
  );
}