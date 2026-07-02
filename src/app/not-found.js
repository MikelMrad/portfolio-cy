import NotFoundView from '@/components/NotFoundView';

// Sync server component (no request-time APIs) — static-export safe.
export default function NotFound() {
  return <NotFoundView />;
}
