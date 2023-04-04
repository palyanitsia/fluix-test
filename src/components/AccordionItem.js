import {__} from "@wordpress/i18n";
import {Button, TextControl, PanelBody} from '@wordpress/components';
import {MediaUpload, RichText} from "@wordpress/block-editor";
import {Image} from "./Image";

export const AccordionItem = ({ item, index, updateItem, handleRemoveImage, handleDelete }) => {
  return (
	<PanelBody key={index} title={item.title ? item.title : `Accordion Item ${index + 1}`}>
	  <div className="flx-accordion-item">
		<div className="flx-accordion-header">
		  <TextControl
			placeholder={__('Heading')}
			value={item.title}
			onChange={(value) => updateItem(index, 'title', value)}
		  />
		</div>
		<div className="flx-accordion-body">
		  <RichText
			className="flx-accordion-body__text"
			label="Title"
			tagName="p"
			allowedFormats={['core/bold', 'core/italic', 'core/link']}
			value={item.content}
			onChange={(value) => updateItem(index, 'content', value)}
			placeholder={__('Text')}
		  />
		  <MediaUpload
			onSelect={(value) => updateItem(index, 'media', value)}
			allowedTypes={['image']}
			render={({open}) => (
			  <Button className="mr-8" variant="secondary" onClick={open}>
				{`${item.media ? __('Replace Image') : __('Upload Image')}`}
			  </Button>
			)}
		  />
		  {item.media && (
			<>
			  <Button
				variant="secondary"
				onClick={() => handleRemoveImage(index)}
			  >
				{__('Remove Image')}
			  </Button>
			  <Image media={item.media}/>
			</>
		  )}
		</div>
	  </div>
	  <div className="text-right">
		<Button
		  variant="secondary"
		  isDestructive
		  className="flx-accordion-delete-button"
		  onClick={() => handleDelete(index)}
		>
		  {__(' Delete row')}
		</Button>
	  </div>
	</PanelBody>
  );
}
