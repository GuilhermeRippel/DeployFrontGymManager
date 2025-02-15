import { forwardRef, useState } from "react";
import { IMaskInput } from "react-imask";
import CloseEyeIcon from '../../assets/icons/CloseEyeIcon.svg';
import OpenEyeIcon from '../../assets/icons/OpenEyeIcon.svg';

interface InputFormsProps {
  type: string;
  placeholder?: string;
  label: string;
  mask?: string;
  lenght?: number;
  configFile?: string;
  onClick?: () => void;
  defaultValue?: string;
  disabled?: boolean
  justify?: string
}

const InputForms = forwardRef<HTMLInputElement | null, InputFormsProps>(
  ({ type, placeholder, label, mask, lenght, configFile, onClick, defaultValue, disabled, justify }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const handlePasswordVisibility = () => {
      setIsVisible(!isVisible);
    };

    return (
      <div className={`flex items-center ${justify ? justify : 'justify-end'} gap-2 relative w-full`}>
        <label className="font-bold">{label}:</label>
        {mask ? (
          <IMaskInput
            mask={mask}
            inputRef={ref as React.RefObject<HTMLInputElement>}
            placeholder={placeholder}
            className="w-[70%] px-4 py-2 border border-green-700 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-600 transition shadow-md"
            maxLength={lenght}
            onClick={onClick}
            defaultValue={defaultValue}
            disabled={disabled}
          />
        ) : (
          <div className="relative w-[70%]">
            <input
              type={type === "password" && isVisible ? "text" : type}
              placeholder={placeholder}
              ref={ref}
              className={`w-full px-4 py-2 border border-green-700 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-600 transition shadow-md ${configFile}`}
              maxLength={lenght}
              onClick={onClick}
              disabled={disabled}
            />
            {type === "password" && !disabled && (
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={handlePasswordVisibility}>
                <img src={isVisible ? CloseEyeIcon : OpenEyeIcon} alt="Mostrar senha" />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

export default InputForms;
