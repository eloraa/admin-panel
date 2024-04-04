import { Card, CardContent } from '../ui/card';
import { IconWrapper } from '../ui/icon';
import { FilterItem } from './filterItem';

export const CustomCard = ({ withFilter, onChange, Icon, children }) => {
  return (
    <Card>
      <CardContent className="flex items-center p-2 gap-2 text-sm font-semibold">
        <IconWrapper size="lg" variant="ghost" className="min-w-16 w-16 h-16">
          <Icon />
        </IconWrapper>
        <div className="min-w-0">{children}</div>
        {withFilter && <FilterItem className="ml-auto" iconOnly />}
      </CardContent>
    </Card>
  );
};
