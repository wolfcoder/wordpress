import $ from 'jquery';

class MyNotes {
    constructor() {
        this.events();
    }

    events() {
        $("#my-notes").on('click', '.delete-note', this.deleteNote);
        $("#my-notes").on('click', '.edit-note', this.editNote.bind(this));
        $("#my-notes").on('click', '.update-note', this.updateNote.bind(this));
        $('.submit-note').on('click', this.createNote.bind(this));
    }

    // Method
    editNote(e) {
        let thisNote = $(e.target).parents("div");
        if (thisNote.data("state") === "editable") {
            this.makeNoteReadOnly(thisNote);
        } else {
            this.makeNoteEditable(thisNote);
        }
    }

    makeNoteEditable(thisNote) {
        thisNote.find('.edit-note').html('Cancel')
        thisNote.find('.input-data').removeAttr('readonly').addClass('note-active');
        thisNote.find('.update-note').css('display', 'inline');
        thisNote.data("state", "editable");
    }

    makeNoteReadOnly(thisNote) {
        thisNote.find('.edit-note').html('Edit')
        thisNote.find('.input-data').attr('readonly', 'readonly').removeClass('note-active');
        thisNote.find('.update-note').css('display', 'hidden');
        thisNote.data("state", "cancel");
    }

    deleteNote(e) {
        let thisNote = $(e.target).parents("div");
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-NONCE', wplainData.nonce)
            },
            url: wplainData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
            type: 'DELETE',
            success: (response) => {
                thisNote.slideUp();
                console.log("congrats");
                console.log(response);
                if(response.userNoteCount <= 2 ) {
                    $(".note-limit").css('display', 'none');
                }
            },
            error: (response) => {
                console.log("Sorry");
                console.log(response);
            }
        })
    }

    updateNote(e) {
        let thisNote = $(e.target).parents("div");

        let ourUpdatedPost = {
            'title': thisNote.find(".title-field").val(),
            'content': thisNote.find(".body-field").val(),
        }

        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-NONCE', wplainData.nonce)
            },
            url: wplainData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
            type: 'POST',
            data: ourUpdatedPost,
            success: (response) => {
                this.makeNoteReadOnly(thisNote);
                console.log("congrats");
                console.log(response);
            },
            error: (response) => {
                console.log("Sorry");
                console.log(response);
            }
        })
    }

    createNote() {
        let ourNewPost = {
            'title': $(".new-note-title").val(),
            'content': $(".new-note-body").val(),
            'status': 'private'
        }

        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-NONCE', wplainData.nonce)
            },
            url: wplainData.root_url + '/wp-json/wp/v2/note/',
            type: 'POST',
            data: ourNewPost,
            success: (response) => {
                $(".new-note-title, .new-note-body").val('');
                $(`
                <div data-id="${response.id}">
                        <label>
                            <input readonly class="input-data title-field" value="${response.title.raw}">
                        </label>
                        <label>
                            <textarea class="input-data body-field" readonly> ${response.content.raw}</textarea>
                        </label>
                        <button class="edit-note">Edit</button>
                        <button style="display: none" class="update-note">Save</button>
                        <button class="delete-note">Delete</button>
                 </div>
                `).prependTo("#my-notes").hide().slideDown();
                console.log("Congrats");
                console.log(response);
            },
            error: (response) => {
                if (response.responseText == "You have reached your notes limit") {
                    $(".note-limit").css('display', 'inline');
                }
                console.log("Sorry");
                console.log(response);
            }
        })
    }
}

export default MyNotes


