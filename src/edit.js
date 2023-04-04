import {__} from "@wordpress/i18n";
import {useBlockProps} from "@wordpress/block-editor";
import {Button, TextControl, Panel, CheckboxControl} from '@wordpress/components';
import {AccordionItem} from './components/AccordionItem';

import "./editor.scss";

export default function Edit({attributes: {items, title, collapsed}, setAttributes}) {

  const addItems = (newItems) => {
	setAttributes({items: newItems});
  };

  const updateItem = (index, key, value) => {
	const newItems = [...items];
	newItems[index] = {...newItems[index], [key]: value};
	setAttributes({items: newItems});
  };

  const handleRemoveImage = (index) => {
	updateItem(index, "media", null);
  };

  const handleDelete = (index) => {
	const newItems = items.filter((item, i) => i !== index);
	setAttributes({items: newItems});
  };

  return (
	<section className='flx-accordion-section' {...useBlockProps()}>
	  <div className="flx-accordion">
		<TextControl
		  label={__('Block Heading')}
		  value={title}
		  placeholder={__('Block Heading')}
		  onChange={(value) => setAttributes({title: value})}
		/>
		<Panel>
		  <div className="text-right pt-8 pr-16 pb-8 pl-16">
			<CheckboxControl
			  label="Collapse"
			  help="Collapse other items"
			  checked={collapsed}
			  onChange={(value) => setAttributes({collapsed: value})}
			/>
		  </div>
		  {items.map((item, index) => (
			<AccordionItem
			  item={item}
			  index={index}
			  updateItem={updateItem}
			  handleRemoveImage={handleRemoveImage}
			  handleDelete={handleDelete}
			/>
		  ))}
		  <div className="text-right pt-8 pr-16 pb-8 pl-16">
			<Button
			  variant="primary"
			  className="accordion-add-button"
			  onClick={() => {
				addItems([...items, {title: '', content: '', media: ''}]);
			  }}
			>
			  {__('Add Item')}
			</Button>
		  </div>
		</Panel>
	  </div>
	</section>
  );
}
