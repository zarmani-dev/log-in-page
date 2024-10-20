import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Props {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  register: any;
  error?: string;
  validation?: object;
}

const InputBox = ({
  label,
  id,
  type,
  placeholder,
  register,
  error,
  validation,
}: Props) => {
  return (
    <div className="mb-3">
      <Label htmlFor={id} className="text-zinc-400">
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        className="text-zinc-200"
        placeholder={placeholder}
        {...register(id, validation)}
      />

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};
export default InputBox;
