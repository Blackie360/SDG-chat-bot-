import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.accessToken) {
      return NextResponse.json({ error: 'No access token available' }, { status: 401 });
    }

    const githubResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!githubResponse.ok) {
      const errorText = await githubResponse.text();
      console.error('GitHub API Error:', errorText);
      return NextResponse.json({ error: 'GitHub API error', details: errorText }, { status: githubResponse.status });
    }

    const data = await githubResponse.json();
    
    return NextResponse.json({
      status: githubResponse.status,
      data,
    });
  } catch (error) {
    console.error('GitHub test route error:', error);
    return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
  }
}