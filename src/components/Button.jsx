function Button({ type, lable, onClick}) {

  return (
    <button
      type={type}
      onClick={onClick} >
        {lable}
    </button>
  );
};

export default Button;
