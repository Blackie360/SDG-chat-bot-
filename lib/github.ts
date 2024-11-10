export async function fetchGitHubData(accessToken: string): Promise<any> {
  try {
    // Fetch user data
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error('Failed to fetch user data:', errorText);
      throw new Error('Failed to fetch user data');
    }

    const userData = await userResponse.json();

    // Fetch repositories
    const reposResponse = await fetch(
      `https://api.github.com/user/repos?sort=updated&per_page=5`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!reposResponse.ok) {
      const errorText = await reposResponse.text();
      console.error('Failed to fetch repos:', errorText);
      throw new Error('Failed to fetch repos');
    }

    const reposData = await reposResponse.json();

    return {
      ...userData,
      repos: reposData,
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    throw error;
  }
}
