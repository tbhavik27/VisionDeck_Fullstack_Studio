/** Reads whichever id field is present: `id` from static data or `_id` from MongoDB. */
export function key(item: { id?: string; _id?: string }): string {
  return item.id ?? item._id ?? Math.random().toString(36).slice(2);
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
