import './form-input.styles.scss';

const FormInput = ({ label, ...otherPorop }) => {
  return (
    <div className='group'>
      <input className='form-input' {...otherPorop} />
      {label && (
        <label
          className={`${
            otherPorop.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
