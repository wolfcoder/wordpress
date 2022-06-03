import axios from "axios"

class MyNotes {
    constructor() {
        if (document.querySelector("#my-notes")) {
            axios.defaults.headers.common["X-WP-Nonce"] = wplainData.nonce
            this.myNotes = document.querySelector("#my-notes")
            this.events()
        }
    }

    events() {
        this.myNotes.addEventListener("click", e => this.clickHandler(e))
        document.querySelector(".submit-note").addEventListener("click", () => this.createNote())
    }

    clickHandler(e) {
        console.log(e)
        if (e.target.classList.contains("delete-note") || e.target.classList.contains("fa-trash-o")) this.deleteNote(e)
        if (e.target.classList.contains("edit-note") || e.target.classList.contains("fa-pencil") || e.target.classList.contains("fa-times")) this.editNote(e)
        if (e.target.classList.contains("update-note") || e.target.classList.contains("fa-arrow-right")) this.updateNote(e)
    }

    findNearestParentLi(el) {
        let thisNote = el
        while (thisNote.tagName != "DIV") {
            thisNote = thisNote.parentElement
        }
        return thisNote
    }

    // Methods will go here
    editNote(e) {
        const thisNote = this.findNearestParentLi(e.target)

        if (thisNote.getAttribute("data-state") == "editable") {
            this.makeNoteReadOnly(thisNote)
        } else {
            this.makeNoteEditable(thisNote)
        }
    }

    makeNoteEditable(thisNote) {
        thisNote.querySelector(".edit-note").innerHTML = '<i class="fa fa-times" aria-hidden="true"></i> Cancel'
        thisNote.querySelector(".note-title-field").removeAttribute("readonly")
        thisNote.querySelector(".note-body-field").removeAttribute("readonly")
        thisNote.querySelector(".note-title-field").classList.add("note-active-field")
        thisNote.querySelector(".note-body-field").classList.add("note-active-field")
        thisNote.querySelector(".update-note").classList.add("update-note--visible")
        thisNote.setAttribute("data-state", "editable")
    }

    makeNoteReadOnly(thisNote) {
        thisNote.querySelector(".edit-note").innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i> Edit'
        thisNote.querySelector(".note-title-field").setAttribute("readonly", "true")
        thisNote.querySelector(".note-body-field").setAttribute("readonly", "true")
        thisNote.querySelector(".note-title-field").classList.remove("note-active-field")
        thisNote.querySelector(".note-body-field").classList.remove("note-active-field")
        thisNote.querySelector(".update-note").classList.remove("update-note--visible")
        thisNote.setAttribute("data-state", "cancel")
    }

    async deleteNote(e) {
        const thisNote = this.findNearestParentLi(e.target)

        try {
            const response = await axios.delete(wplainData.root_url + "/wp-json/wp/v2/note/" + thisNote.getAttribute("data-id"))
            thisNote.style.height = `${thisNote.offsetHeight}px`
            setTimeout(function () {
                thisNote.classList.add("fade-out")
            }, 20)
            setTimeout(function () {
                thisNote.remove()
            }, 401)
            if (response.data.userNoteCount < 5) {
                document.querySelector(".note-limit").style.display = "none"
            }
        } catch (e) {
            console.log("Sorry")
        }
    }

    async updateNote(e) {
        const thisNote = this.findNearestParentLi(e.target)

        var ourUpdatedPost = {
            "title": thisNote.querySelector(".note-title-field").value,
            "content": thisNote.querySelector(".note-body-field").value
        }

        try {
            const response = await axios.post(wplainData.root_url + "/wp-json/wp/v2/note/" + thisNote.getAttribute("data-id"), ourUpdatedPost)
            this.makeNoteReadOnly(thisNote)
        } catch (e) {
            console.log("Sorry")
        }
    }

    async createNote() {

        var ourNewPost = {
            "title": document.querySelector(".new-note-title").value,
            "content": document.querySelector(".new-note-body").value,
            "status": "publish"
        }

        try {
            const response = await axios.post(wplainData.root_url + "/wp-json/wp/v2/note/", ourNewPost)
            console.log(response)

            if (response.data != "You have reached your notes limit") {
                document.querySelector(".new-note-title").value = ""
                document.querySelector(".new-note-body").value = ""
                document.querySelector("#my-notes").insertAdjacentHTML("afterbegin", `
                <div data-id="${response.data.id}">
                        <label>
                            <input readonly class="input-data title-field" value="${response.data.title.raw}">
                        </label>
                        <label>
                            <textarea class="input-data body-field" readonly> ${response.data.content.raw}</textarea>
                        </label>
                        <button class="edit-note">Edit</button>
                        <button style="display: none" class="update-note">Save</button>
                        <button class="delete-note">Delete</button>
                 </div>
`)
            }
              else {
                document.querySelector(".note-limit").style.display = "inline"
            }
        } catch (e) {
            console.error(e)
        }
    }
}

export default MyNotes
