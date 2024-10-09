import { getProfileByUserIdAction } from "@/actions/profiles-actions";
import { createProfile } from "@/db/queries/profiles-queries";
import { auth } from "@clerk/nextjs";

export async function ensureProfile() {
  const { userId } = auth();

  if (userId) {
    const res = await getProfileByUserIdAction(userId);
    if (!res.data) {
      await createProfile({ userId });
    }
  }
}