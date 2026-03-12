const FacultyCard = ({ name, post, phone, highlight = false }) => {
  return (
    <div
      className={`bg-white border border-background-200 rounded-xl p-6 text-center shadow-sm
      ${highlight ? "max-w-md mx-auto border-primary-600" : ""}`}
    >
      <h3 className="text-lg font-semibold text-background-900">{name}</h3>

      <p className="text-primary-600 font-medium mt-1">{post}</p>

      <p className="text-sm text-background-700 mt-2">📞 {phone}</p>
    </div>
  );
};

export default FacultyCard;
