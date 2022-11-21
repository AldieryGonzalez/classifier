import { ReactNode } from "react";
import { Alert } from "./Alert";

interface LayoutProps {
  children: ReactNode;
}

import { useAlert } from "../contexts/AlertContext";

export default function Layout({ children, ...props }: LayoutProps) {
  const alertProps = useAlert()?.alertProps;
  console.log(alertProps);
  return (
    <div className="relative h-full overflow-hidden">
      <>{children}</>
      {alertProps ? (
        <Alert
          variant={alertProps.variant}
          label={alertProps.header}
          duration={alertProps.duration}
          children={alertProps.message}
        />
      ) : null}
    </div>
  );
}
