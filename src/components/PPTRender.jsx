import { Marp } from '@marp-team/marp-react';
import clsx from "clsx";

const PPTRender = ({ markdown, backgroundColor, mode }) => {
  return (
    <div
      id="ppt-render"
      className={clsx("w-1/2 min-h-screen h-auto overflow-y-auto", mode === 'preview' ? 'w-full' : 'w-1/2')}
      style={{ backgroundColor: backgroundColor }}
    >
      <Marp markdown={markdown} />
    </div>
  );
};

export default PPTRender;
