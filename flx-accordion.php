<?php
/**
 * Plugin Name:       Flx Accordion
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       flx-accordion
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets, so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

add_action('init', function () {
	add_image_size('accordion_image', 344, 287, true);
	add_image_size('accordion_image2x', 688, 574, true);

	register_block_type(__DIR__ . '/build');
});


add_filter('image_size_names_choose', function ($sizes) {
	$new_sizes = [
		'accordion_image' => __('Accordion Image'),
		'accordion_image2x' => __('Accordion Image 2x'),
	];
	return array_merge($sizes, $new_sizes);
});

add_action('enqueue_block_assets', function () {
	if (!is_admin()) {
		wp_enqueue_script('client', plugin_dir_url(__FILE__) . 'build/autoload.js', '', '1.0.0', true);
	}
});

