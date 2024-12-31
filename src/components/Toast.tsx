import { useEffect } from "react";

type Props = {
  type: string;
  message: string;
  onClose: () => void;
};
const Toast = ({ type, message, onClose }: Props) => {
  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md"
      : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md";

  useEffect(() => {
    console.log('render')
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <div className="text-lg font-semibold">{message}</div>
      </div>
    </div>
  );
};
export default Toast;
