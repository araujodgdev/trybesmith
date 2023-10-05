export default function mapHttpStatus(status: string): number {
  const statusMap: Record<string, number> = {
    CREATED: 201,
    NOT_FOUND: 404,
    INVALID_DATA: 400,
    SUCCESS: 200,
    UNAUTHORIZED: 401,
  };

  return statusMap[status];
}