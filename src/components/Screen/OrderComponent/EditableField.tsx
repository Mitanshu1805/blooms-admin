const EditableField = ({
  value,
  onSave,
  label,
  editable,
  isEditing,
  setIsEditing,
  onInputChange,
}: any) => {
  const handleEdit = () => {
    if (editable) {
      setIsEditing(true);
    }
  };

  return (
    <div className='content-details-div'>
      <strong className='content-details-label'>{label}</strong>
      {editable && isEditing ? (
        <div className='editable-div'>
          :
          <textarea
            className='content-details-input'
            value={value}
            onChange={onInputChange}
            style={{ whiteSpace: 'pre-wrap' }}
          />
          <div className='margin-div'>
            <i className='bx bx-edit-alt icon-primary-color' />
          </div>
        </div>
      ) : (
        <div className='edit-text-div'>
          <span className='content-details-title'>: {value}</span>{' '}
          {editable && (
            <div className='margin-div' onClick={handleEdit}>
              <i className='bx bx-edit-alt icon-primary-color' />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditableField;
