import { useMemo } from 'react';
import { RgbaStringColorPicker } from 'react-colorful';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
extend([namesPlugin]);

export const ColorPicker = ({ color, ...props }) => {
  const rgbaString = useMemo(() => {
    return color.startsWith('rgba') ? color : colord(color).toRgbString();
  }, [color]);

  return <RgbaStringColorPicker color={rgbaString} {...props} />;
};
