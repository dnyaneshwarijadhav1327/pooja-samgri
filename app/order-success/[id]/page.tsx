// Server Component — required for generateStaticParams with output: export
import OrderSuccessClient from './OrderSuccessClient';

// Required for static export: provide at least one placeholder path
export async function generateStaticParams() {
  return [{ id: 'order-confirmed' }];
}

export default function OrderSuccessPage() {
  return <OrderSuccessClient />;
}
