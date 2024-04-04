import { Title } from '@/components/ui/title';
import { Provider } from './provider';

export default function Kam() {
  return (
    <div className="space-y-8 layer">
      <section>
        <Title>Courier Info</Title>
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4 mt-4">
          <Provider label="Steadfast" email="elora@steadfast.sandbox.fr.to" password="123456" />
          <Provider label="Pathao" email="elora@pathao.sandbox.fr.t" password="123456" />
          <Provider label="RedX" email="elora@redx.sandbox.fr.t" password="123456" />
        </div>
      </section>
    </div>
  );
}
