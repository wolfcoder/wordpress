<!DOCTYPE html>
<html lang="en">
<head>
    <title>WP</title>
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="Put your description here.">
	<?php wp_head(); ?>
</head>
<body>
<h2>Our Notes</h2>
<section id="my-notes">

	<?php

	$userNotes = new WP_Query( array(
		'post_type'    => 'note',
		'post_perPage' => - 1,
		'author'       => get_current_user_id()
	) );

	while ( $userNotes->have_posts() ) {
		$userNotes->the_post(); ?>
        <div data-id="<?php echo the_ID(); ?>">
            <label>
                <input readonly class="input-data title-field"
                       value="<?php echo str_replace( 'Private: ', '', esc_attr( get_the_title() ) ) ?>">
            </label>
            <label>
                <textarea class="input-data body-field" readonly><?php echo get_the_content(); ?></textarea>
            </label>
            <button class="edit-note">Edit</button>
            <button style="display: none" class="update-note">Save</button>
            <button class="delete-note">Delete</button>
        </div>
		<?php
	} ?>

</section>

<section class="create-note">
    <h2>Create Note</h2>
    <label>
        <input class="new-note-title" placeholder="Title">
    </label>
    <label>
        <textarea class="new-note-body" placeholder="Your note here..."></textarea>
    </label>
    <button class="submit-note">Create Note</button>
    <span class="note-limit"  style="display: none" >You have reached your notes limit</span>
</section>
<?php
get_footer();
?>

