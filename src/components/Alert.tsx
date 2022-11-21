import classnames from "classnames";

type AlertProps = {
  children: React.ReactNode;
  label: string;
  variant: string;
  duration: number;
};

export const Alert: React.FC<AlertProps> = ({
  children,
  label,
  variant,
  duration,
  ...props
}) => {
  return (
    <div
      className={classnames(
        "absolute bottom-3 right-0 z-[1] box-border min-w-max bg-orange-100 p-4 text-orange-700 ",
        `animate-[slide_${duration}ms_linear_1]`
      )}
      role="alert"
    >
      <div className="absolute top-0 left-0 h-full animate-load bg-orange-500 bg-opacity-30"></div>
      <p className="font-bold">{label}</p>
      <p>{children + `${duration}`}</p>
    </div>
  );
};
