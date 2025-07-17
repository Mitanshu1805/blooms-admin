import { useRef } from 'react';
import Button from '../../Button/Button';

export default function QuoteMultiImagePicker({
  selectedImages,
  setSelectedImages,
}: any) {
  const fileInputRef: any = useRef(null);

  const handleImageChange = (event: any) => {
    const files = Array.from(event.target.files);
    const validImages: any = files.filter((file: any) => {
      const fileType = file.type;
      const validImageTypes = ['image/jpeg', 'image/png'];
      return validImageTypes.includes(fileType);
    });

    setSelectedImages(selectedImages.concat(validImages));
  };

  const handleImageRemove = (index: any) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className='quote-img-section'>
        {selectedImages.map((image: any, index: number) => (
          <div key={index} className='quote-img-container'>
            <img src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} />
            <div
              className='quotes-remove-img'
              onClick={() => handleImageRemove(index)}
            >
              X
            </div>
          </div>
        ))}
      </div>
      <label htmlFor='image-upload'>
        <Button
          className='details-card-add-btn'
          name={'+ Add Images'}
          onClick={handleButtonClick}
        />
      </label>
      <input
        ref={fileInputRef}
        id='image-upload'
        type='file'
        multiple
        accept='image/*'
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}
