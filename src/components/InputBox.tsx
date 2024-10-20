import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Props {
  label: string;
  id: string;
  type: string;
  placeholder: string;
}

const InputBox = ({ label, id, type, placeholder }: Props) => {
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
      />
    </div>
  );
};
export default InputBox;
