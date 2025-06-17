export async function showHome({ getStories, renderHome }) {
  try {
    const stories = await getStories();

    if (!stories || !Array.isArray(stories)) {
      throw new Error('Invalid story data');
    }

    renderHome(stories);
  } catch (error) {
    console.error('Failed to load stories:', error);
  }
}
