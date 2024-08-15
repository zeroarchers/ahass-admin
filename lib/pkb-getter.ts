"use client";
import type { PKBWithRelations } from "@/types";

export async function getPkbByIdClient(
  id: string,
): Promise<PKBWithRelations | null> {
  try {
    const response = await fetch(`/api/pkb/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch PKB");
    }
    const data = await response.json();
    return data as PKBWithRelations;
  } catch (error) {
    console.error("Error fetching PKB:", error);
    return null;
  }
}
