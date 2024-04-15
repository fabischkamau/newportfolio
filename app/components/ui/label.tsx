import * as React from "react";

import { cn } from "~/lib/utils";

export interface LabelProps
  extends React.InputHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return <label className={cn("block", className)} ref={ref} {...props} />;
  }
);
Label.displayName = "Label";

export { Label };
