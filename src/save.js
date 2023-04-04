import {useBlockProps, RichText} from "@wordpress/block-editor";

export default function save({attributes}) {
  const {items, title, collapsed} = attributes;

  return (
	<section className="flx-accordion-section" {...useBlockProps}>
	  <h2 className="flx-accordion-section__title">{title}</h2>
	  <div className="flx-accordion" data-collapsed={collapsed}>
		{items.map((item, index) => {
		  if (item.title && item.content) {
			return (
			  <div className="flx-accordion__item" key={index}>
				<h3 className="flx-accordion__header">
				  <button
					className="flx-accordion__button"
					data-target={`#item-${index}`}
					aria-expanded="false"
					aria-controls={`item-${index}`}>
					<span>{item.title}</span>
				  </button>
				</h3>
				<div id={`item-${index}`} className="flx-accordion__collapse">
				  <div className="flx-accordion__body">
					<div className="flx-accordion__row">
					  <div className="flx-accordion__col">
						<RichText.Content tagName="p" value={item.content}/>
					  </div>
					  {item.media && (
						<div className="flx-accordion__col">
						  <img
							className="lazy"
							width={344}
							height={287}
							src={item.media.sizes.accordion_image.url}
							srcSet={item.media.sizes.accordion_image2x.url}
							data-src={item.media.sizes.accordion_image.url}
							data-srcSet={item.media.sizes.accordion_image2x.url}
							alt={item.media.name}/>
						</div>
					  )}
					</div>
				  </div>
				</div>
			  </div>
			)
		  }
		})}
	  </div>
	</section>
  );
}
