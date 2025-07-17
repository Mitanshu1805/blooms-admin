import { DocIcon, RedCrossIcon, RemoveIcon } from '../../../assets';
import Image from '../../Image/Image';

function AddDocument({
  name,
  logoPreview,
  onChangeLogo,
  removePreview,
  error,
}: any) {
  return (
    <div className='doc-container-style'>
      <label className='input-label'>Upload {name} Image</label>
      {logoPreview === '' ||
      logoPreview === null ||
      logoPreview === undefined ? (
        <div className='flex-col-cen-cen-div add-doc'>
          <label className='doc-img'>
            <Image src={DocIcon} />
            <input
              id='files'
              style={{ visibility: 'hidden' }}
              accept='image/*'
              type='file'
              onChange={onChangeLogo}
            />
          </label>
          <span className='doc-title'>Upload {name}</span>
          <span className='doc-sub'>
            You can only upload png and jpeg format
          </span>
        </div>
      ) : (
        <div className='flex-col-cen-cen-div selected-img'>
          <Image
            src={logoPreview}
            className='flex-col-cen-cen-div selected-img'
          />
          <div className='edit' onClick={removePreview}>
            <Image src={RedCrossIcon} />
          </div>
        </div>
      )}
      {error ? (
        <div className='inputText-error-container'>
          <Image className='inputText-img' src={RemoveIcon} />
          <span>{error}</span>
        </div>
      ) : null}
    </div>
  );
}

export default AddDocument;
