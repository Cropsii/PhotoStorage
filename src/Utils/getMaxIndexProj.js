import { pb } from "./PB";

export async function getMaxIndex(userId) {
  try {
    const index = await pb
      .collection("Projects")
      .getFirstListItem(`relation="${userId}"`, { sort: "-index" });
    return index?.index;
  } catch (error) {
    console.error(error);
    return 0;
  }
}
