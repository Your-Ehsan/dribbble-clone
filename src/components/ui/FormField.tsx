type Props = {
  type?: string;
  title: string;
  state: string;
  isTextArea?: boolean;
  placeholder: string;
  setState: (value: string) => void; // return nothing
};
const FormField = ({
  title,
  state,
  placeholder,
  setState,
  isTextArea,
  type,
}: Props) => {
  return (
    <div className="flexStart flex-col w-full gap-4">
      <label className="w-full text-gray-100">{title}</label>
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder}
          required
          value={state}
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      )}
    </div>
  );
};

export default FormField;
