<?php

function wplain_enqueue_script() {
	wp_enqueue_script( 'plain', get_stylesheet_directory_uri() . '/build/index.js', array( 'jquery' ), '1.0', true );

	wp_localize_script( 'plain', 'wplainData', array(
		'root_url' => get_site_url(),
		'nonce'    => wp_create_nonce( 'wp_rest' )
	) );
}

add_action( 'wp_enqueue_scripts', 'wplain_enqueue_script' );

//FORCE note posts to be private
add_filter( 'wp_insert_post_data', 'makeNotePrivate', 10, 2 );

function makeNotePrivate( $data, $postarr ) {
	// sanitize for security
	if ( $data['post_type'] == 'note' ) {

		if ( count_user_posts( get_current_user_id(), 'note' ) > 1 and ! $postarr['ID'] ) {
			die( "You have reached your notes limit" );
		}
		$data['post_content'] = sanitize_textarea_field( $data['post_content'] );
		$data['post_title']   = sanitize_text_field( $data['post_title'] );
	}
	if ( $data['post_type'] == 'note' and $data['post_status'] != 'trash' ) {
		$data['post_status'] = 'private';
	}

	return $data;
}

// Custom note rest api
add_action( 'rest_api_init', 'custom_rest' );
function custom_rest() {
	register_rest_field( 'note', 'userNoteCount', array(
		'get_callback' => function () {
			return count_user_posts( get_current_user_id(), 'note' );
		}
	));
}
