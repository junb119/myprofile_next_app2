export async function GET() {
  return Response.json({
    envUrl: process.env.DATABASE_URL,
  });
}
