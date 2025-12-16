import type { TokenManager } from '@/utils/token';
/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(
  initialState: { token: TokenManager } | undefined,
) {
  const { token } = initialState ?? {};
  const role = (token?.decode() as { role?: string } | null)?.role;
  console.log(role);

  return {
    canAdmin: role === 'admin',
    canUser: role === 'user',
  };
}
