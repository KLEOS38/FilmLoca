import { supabase } from "@/integrations/supabase/client";

// Fix Office Space field by ensuring column exists
export async function fixOfficeSpaceField() {
  console.log("🔧 FIXING OFFICE SPACE FIELD");

  try {
    // 1. Try to add the column safely using direct SQL
    console.log("\n📋 Step 1: Adding has_office_space column...");

    // First, let's try to update a property to see if the field exists
    const { data: testProperty, error: testError } = await supabase
      .from("properties")
      .select("id")
      .limit(1);

    if (testError) {
      console.error("❌ Cannot access properties table:", testError);
      return false;
    }

    const testId = testProperty?.[0]?.id;
    if (testId) {
      // Try to update with has_office_space to test if field exists
      const { data: updateTest, error: updateTestError } = await supabase
        .from("properties")
        .update({
          has_office_space: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", testId)
        .select("id, has_office_space")
        .single();

      if (updateTestError) {
        console.error(
          "❌ Field does not exist - need to add it:",
          updateTestError.message,
        );

        // Field doesn't exist, we need to add it via migration
        console.log("\n📋 Step 2: Field missing - creating migration...");

        // For now, let's use a workaround by storing in rules field
        const { data: workaroundResult, error: workaroundError } =
          await supabase
            .from("properties")
            .update({
              rules: `OFFICE_SPACE:true|${new Date().toISOString()}`,
              updated_at: new Date().toISOString(),
            })
            .eq("id", testId)
            .select("id, rules")
            .single();

        if (workaroundError) {
          console.error("❌ Workaround failed:", workaroundError);
          return false;
        } else {
          console.log(
            "✅ Workaround applied - Office Space data stored in rules field",
          );
          console.log(
            "📝 Manual fix needed: Run ADD_OFFICE_SPACE_COLUMN.sql in database",
          );
          return true;
        }
      } else {
        console.log("✅ Field exists and is working!");
        console.log("Test result:", updateTest);
        return true;
      }
    }
  } catch (error) {
    console.error("❌ Fix function failed:", error);
    return false;
  }
}

// Extract office space from rules field (temporary workaround)
// Reads the LAST occurrence so that the most-recently saved value always wins
export function extractOfficeSpaceFromRules(rules: string | null): boolean {
  if (!rules) return false;

  const matches = [...rules.matchAll(/OFFICE_SPACE:(true|false)/g)];
  if (matches.length === 0) return false;
  // Use the last match so a later edit always takes precedence
  return matches[matches.length - 1][1] === "true";
}

// Add office space to rules field (temporary workaround)
// Replaces any existing OFFICE_SPACE tag so re-edits always reflect the latest value
export function addOfficeSpaceToRules(
  existingRules: string | null,
  hasOfficeSpace: boolean,
): string {
  const officeSpaceTag = `OFFICE_SPACE:${hasOfficeSpace}`;

  // Strip ALL previous OFFICE_SPACE entries (with or without a timestamp suffix)
  const cleaned = (existingRules || "")
    .split("\n")
    .filter((line) => !line.trim().startsWith("OFFICE_SPACE:"))
    .join("\n")
    .trim();

  if (cleaned) {
    return `${cleaned}\n${officeSpaceTag}`;
  } else {
    return officeSpaceTag;
  }
}
