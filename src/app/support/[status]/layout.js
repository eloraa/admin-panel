import Layout from '../_layout';

export default function SubLayout({ children, params }) {
  return <Layout params={params}>{children}</Layout>;
}
