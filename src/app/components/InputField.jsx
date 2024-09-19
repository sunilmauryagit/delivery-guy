export default function InputField(props) {
  return (
    <div className="mb-3">
      {props.label && (
        <label htmlFor={props.name} className="form-label">
          {props.label}
        </label>
      )}
      <input {...props} id={props.name} className="form-control" />
      <small className="visually-hidden text-danger">
        This field is required.
      </small>
    </div>
  );
}
