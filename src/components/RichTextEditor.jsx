// // RichTextEditor.jsx
// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // Import styles

// const RichTextEditor = ({ onContentChange }) => {
//   const [value, setValue] = useState('');

//   const handleChange = (content, _, __, editor) => {
//     setValue(content);
//     onContentChange(content);
//   };

//   return (
//     <ReactQuill
//       theme="snow"
//       value={value}
//       onChange={handleChange}
//       placeholder="Write something here..."
//       className="h-[10rem] "
//     />
//   );
// };

// export default RichTextEditor;
